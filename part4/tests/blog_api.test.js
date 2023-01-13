const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await Blog.insertMany(helper.initialBlogs)
	})

	test('blogs are returned as json', async () => {
		console.log('entered test')
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await helper.blogsInDb()
		expect(response).toHaveLength(helper.initialBlogs.length)
	})

	test('name of the id field is in correct format', async () => {
		const response = await helper.blogsInDb()
		expect(response[0].id).toBeDefined()
	})

	describe('operations requiring token authorization', () => {
		let token

		beforeEach(async () => {
			await User.deleteMany({})

			const passwordHash = await bcrypt.hash('password', 10)
			const user = new User({ username: 'testuser', passwordHash })

			await user.save()

			const userForToken = { username: user.username, id: user._id }
			token = jwt.sign(userForToken, process.env.SECRET)
		})
		test('adding a blog successfully', async () => {
			const newBlog = {
				title: 'Blog of My Life',
				author: 'Jack Bauer',
				url: 'www.myblog.com',
				likes: 23
			}

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${token}` )
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
			const titles = blogsAtEnd.map(n => n.title)
			expect(titles).toContain(newBlog.title)
		})

		test('fails with status code 401 if token is missing', async () => {
			const newBlog = {
				title: 'Blog of My Life',
				author: 'Jack Bauer',
				url: 'www.myblog.com',
				likes: 23
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(401)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
		})

		test('likes is set to zero without value', async () => {
			const newBlog = {
				title: 'Blog of My Life',
				author: 'Jack Bauer',
				url: 'www.myblog.com',
				likes: ''
			}

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${token}` )
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
			expect(blogsAtEnd[2].likes).toBe(0)
		})

		test('fails with status code 400 if blog is missing title and url', async () => {
			const newBlog = {
				author: 'Jack Bauer',
				likes: 15
			}

			await api
				.post('/api/blogs')
				.set('Authorization', `bearer ${token}`)
				.send(newBlog)
				.expect(400)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
		})

		test('a blog deleted successfully', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const newBlog = {
				title: 'Blog of My Life',
				author: 'Jack Bauer',
				url: 'www.myblog.com',
				likes: 23
			}

			const blogToDelete = await api.post('/api/blogs')
				.set('Authorization', `bearer ${token}`)
				.send(newBlog)

			await api
				.delete(`/api/blogs/${blogToDelete.body.id}`)
				.set('Authorization', `bearer ${token}` )
				.expect(204)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
			const titles = blogsAtEnd.map(n => n.title)
			expect(titles).not.toContain(blogToDelete.title)
		})
	})

	describe('updating a blog', () => {
		test('updated successfully', async () => {
			const blogsAtStart = await helper.blogsInDb()
			const blogToUpdate = blogsAtStart[0]
			blogToUpdate['likes'] = 77

			await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(blogToUpdate)
				.expect(200)

			const blogsAtEnd = await helper.blogsInDb()
			expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
			expect(blogsAtEnd[0].likes).toBe(77)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})