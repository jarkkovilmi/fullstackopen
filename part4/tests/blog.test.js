const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

test('notes are returned as json', async () => {
	console.log('entered test')
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('name of the id field is in correct format', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
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
	console.log(blogsAtEnd.body[6])
	expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1)
	expect(blogsAtEnd.body[6].likes).toBe(0)
})

test('blog is missing title and url', async () => {
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

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})


describe('total likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.totalLikes(helper.listWithoutBlogs)
		expect(result).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		const result = listHelper.totalLikes(helper.listWithOneBlog)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(helper.initialBlogs)
		expect(result).toBe(36)
	})
})

describe('favorite blog', () => {
	test('of empty list is zero', () => {
		const result = listHelper.favoriteBlog(helper.listWithoutBlogs)
		expect(result).toEqual(0)
	})

	test('when list has only one blog', () => {
		const result = listHelper.favoriteBlog(helper.listWithOneBlog)
		expect(result).toEqual(helper.listWithOneBlog[0])
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.favoriteBlog(helper.initialBlogs)
		expect(result).toEqual(helper.initialBlogs[2])
	})
})

describe('most blogs', () => {
	test('of empty list is zero', () => {
		const result = listHelper.mostBlogs(helper.listWithoutBlogs)
		expect(result).toEqual(0)
	})

	test('when list has only one blog', () => {
		const result = listHelper.mostBlogs(helper.listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.mostBlogs(helper.initialBlogs)
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
	})
})

describe('most likes', () => {
	test('of empty list is zero', () => {
		const result = listHelper.mostLikes(helper.listWithoutBlogs)
		expect(result).toEqual(0)
	})

	test('when list has only one blog', () => {
		const result = listHelper.mostLikes(helper.listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.mostLikes(helper.initialBlogs)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
	})
})

afterAll(() => {
	mongoose.connection.close()
})