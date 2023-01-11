const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('name of the id field is in correct format', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body[0].id).toBeDefined()
	})

	describe('addition of a new blog', () => {
		test('adding a blog successfully', async () => {
			const newBlog = {
				title: 'Blog of My Life',
				author: 'Jack Bauer',
				url: 'www.myblog.com',
				likes: 23
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await api.get('/api/blogs')
			expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)

			const titles = blogsAtEnd.body.map(n => n.title)
			expect(titles).toContain('Blog of My Life')
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
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const blogsAtEnd = await api.get('/api/blogs')
			expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)
			expect(blogsAtEnd.body[2].likes).toBe(0)
		})

		test('fails with status code 400 if blog is missing title and url', async () => {
			const newBlog = {
				author: 'Jack Bauer',
				likes: 15
			}

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)

			const blogsAtEnd = await api.get('/api/blogs')
			expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
		})
	})

	describe('deletion of a blog', () => {
		test('deleted successfully', async () => {
			const blogsAtStart = await api.get('/api/blogs')
			const blogToDelete = blogsAtStart.body[0]

			await api
				.delete(`/api/blogs/${blogToDelete.id}`)
				.expect(204)

			const blogsAtEnd = await api.get('/api/blogs')
			expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length - 1)
			const titles = blogsAtEnd.body.map(n => n.title)
			expect(titles).not.toContain(blogToDelete.title)
		})
	})

	describe('updating a blog', () => {
		test('updated successfully', async () => {
			const blogsAtStart = await api.get('/api/blogs')
			const blogToUpdate = blogsAtStart.body[0]
			blogToUpdate['likes'] = 77

			await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(blogToUpdate)
				.expect(200)

			const blogsAtEnd = await api.get('/api/blogs')
			expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
			expect(blogsAtEnd.body[0].likes).toBe(77)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})