describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const user = {
			name: 'Test User',
			username: 'tuser',
			password: 'password'
		}
		cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('Log in to application')
		cy.contains('login')
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('tuser')
			cy.get('#password').type('password')
			cy.get('#login-button').click()

			cy.contains('Test User logged in')
		})

		it('fails with wrong credentials', function() {
			cy.contains('login').click()
			cy.get('#username').type('tuser')
			cy.get('#password').type('wrong')
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'invalid username or password')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid')

			cy.get('html').should('not.contain', 'Test User logged in')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({ username: 'tuser', password: 'password' })
		})

		it('A blog can be created', function() {
			cy.contains('create a new blog').click()
			cy.get('#titleInput').type('a blog created by cypress')
			cy.get('#authorInput').type('an author created by cypress')
			cy.get('#urlInput').type('an url created by cypress')
			cy.get('#createBlogButton').click()
			cy.contains('a blog created by cypress')
		})
	})
})