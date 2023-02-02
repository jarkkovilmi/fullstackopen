const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const author = require('./models/author')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

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

  type Query {
		bookCount: Int!
  	authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
  }

	type Mutation {
    addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String]
    ): Book!
		editAuthor(name: String, setBornTo: Int): Author
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
		allAuthors: async () => Author.find({})
  },
	Author: {
		bookCount: async (root) => {
			const author = await Author.findOne({ name: root.name })
			return await Book.collection.countDocuments({ author: author._id })
		}
	},
	Mutation: {
		addBook: async (root, args) => {
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author, born: null })
				await author.save()
			}
      const book = new Book({ ...args, author })
      return await book.save()
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOne({ name: args.name })
			if (!author)
				return null
      author.born = args.setBornTo
			return await Author.findByIdAndUpdate(author._id, author, { new: true })
		}
	}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})