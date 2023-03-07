import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Todo from './Todo'

test('<Todo /> renders content', async () => {
	const onClickComplete = jest.fn()
	const onClickDelete = jest.fn()

	const todo = {
		_id: 1,
		text: 'test todo component',
		done: false
	}

	render(
		<Todo
			key={todo._id}
			onClickComplete={onClickComplete}
			onClickDelete={onClickDelete}
			todo={todo}
		/>
	)

	const element = screen.getByText('test todo component')

	expect(element).toBeDefined()
})