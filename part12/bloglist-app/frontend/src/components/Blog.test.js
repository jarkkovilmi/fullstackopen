import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	let container

	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'author',
		url: 'www.test.fi',
		likes: 14,
		user: {
			name: 'Test Name'
		}
	}

	const loggedUser = {
		name: 'Test Name'
	}

	const mockHandler = jest.fn()

	beforeEach(() => {
		container = render(<Blog blog={blog} user={loggedUser} addLike={mockHandler} />).container
	})

	test('renders title and author', () => {
		screen.getByText(`"${blog.title}" by ${blog.author}`)
		const div = container.querySelector('.blogContent')
		expect(div).toHaveStyle('display: none')
	})

	test('renders url, likes and user when view button is pressed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const div = container.querySelector('.blogContent')
		expect(div).not.toHaveStyle('display: none')
	})

	test('clicking like button twice calls event handler twice', async () => {
		const user = userEvent.setup()
		const viewButton = screen.getByText('view')
		await user.click(viewButton)

		const likeButton = screen.getByText('like')
		await user.click(likeButton)
		await user.click(likeButton)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})