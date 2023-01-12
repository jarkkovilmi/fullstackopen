const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'johndoe',
			name: 'John Doe',
			password: 'password',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	describe('validation of username and password', () => {
		test('creation fails with proper statuscode and message if username is too short', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'jo',
				name: 'John Doe',
				password: 'password',
			}

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(result.body.error).toContain('username must be atleast 3 characters long')

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})

		test('creation fails with proper statuscode and message if password is too short', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: 'johndoe',
				name: 'John Doe',
				password: 'pw',
			}

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(result.body.error).toContain('password must be atleast 3 characters long')

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})

		test('creation fails with proper statuscode and message if username is missing', async () => {
			const usersAtStart = await helper.usersInDb()

			const newUser = {
				username: '',
				name: 'John Doe',
				password: 'password',
			}

			const result = await api
				.post('/api/users')
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(result.body.error).toContain('User validation failed: username: username is missing')

			const usersAtEnd = await helper.usersInDb()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})
	})
})

afterAll(() => {
	mongoose.connection.close()
})