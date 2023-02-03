const config = require('./config')
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = config.SECRET
const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
	type Author {
		name: String!
    born: Int
    id: ID!
		bookCount: Int
	}

	type Book {
		title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

  type Query {
		bookCount: Int!
  	authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
  }

	type Mutation {
    addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]
    ): Book!
		editAuthor(name: String, setBornTo: Int): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
  	authorCount: async () => Author.collection.countDocuments(),
		bookCount: async () => Book.collection.countDocuments(),
		allBooks: async (root, args) => {
			let conditions = {}
			if (args.genre)
				conditions.genres = { $in: args.genre }
			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				conditions.author = author._id
			}
			return Book.find(conditions).populate('author', { name: 1, born: 1 })
		},
		allAuthors: async () => Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		}
  },
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name })
			return await Book.collection.countDocuments({ author: author._id })
		}
	},
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError("not authenticated")
			
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author, born: null })
				try {
				await author.save()
				} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args })
				}
			}
      const book = new Book({ ...args, author })
			try {
      	await book.save()
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args })
			}
			return book
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser)
				throw new AuthenticationError("not authenticated")
			
			const author = await Author.findOne({ name: args.name })
			if (!author)
				return null
      author.born = args.setBornTo
			try {
				await Author.findByIdAndUpdate(author._id, author, { new: true })
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args })
			}
			return author
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favoriteGenre: args.favoriteGenre
			})
	
			try {
				await user.save()
			} catch (error) {
				throw new UserInputError(error.message, { invalidArgs: args })
			}
			return user
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if ( !user || args.password !== 'secret' )
				throw new UserInputError("wrong credentials")

			const userForToken = { username: user.username, id: user._id }
			return { value: jwt.sign(userForToken, JWT_SECRET) }
		}
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
	context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})