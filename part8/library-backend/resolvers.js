const config = require('./config')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = config.SECRET

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
	Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
	Mutation: {
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('not authenticated', { extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}
			
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author, born: null })
				try {
				await author.save()
				} catch (error) {
					throw new GraphQLError('Saving author failed', {
						extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author, error }
					})
				}
			}
      const book = new Book({ ...args, author })
			try {
      	await book.save()
			} catch (error) {
				throw new GraphQLError('Saving book failed', {
					extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title, error }
				})
			}

			pubsub.publish('BOOK_ADDED', { bookAdded: book })
			
			return book
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('not authenticated', { extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}
			
			const author = await Author.findOne({ name: args.name })
			if (!author)
				return null
			
      author.born = args.setBornTo
			try {
				await Author.findByIdAndUpdate(author._id, author, { new: true })
			} catch (error) {
				throw new GraphQLError('Editing author failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
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
				throw new GraphQLError('Creating the user failed', {
					extensions: {code: 'BAD_USER_INPUT', invalidArgs: args.username,error }
				})
			}
			return user
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }

			const userForToken = { username: user.username, id: user._id }
			return { value: jwt.sign(userForToken, JWT_SECRET) }
		}
	}
}

module.exports = resolvers