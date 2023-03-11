import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const user = userEvent.setup()
	const createBlog = jest.fn()

	render(<BlogForm createBlog={createBlog} />)

	const inputs = screen.getAllByRole('textbox')
	const sendButton = screen.getByText('create')

	await user.type(inputs[0], 'Title for test')
	await user.type(inputs[1], 'Author for test')
	await user.type(inputs[2], 'Url for test')
	await user.click(sendButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('Title for test')
	expect(createBlog.mock.calls[0][0].author).toBe('Author for test')
	expect(createBlog.mock.calls[0][0].url).toBe('Url for test')
})