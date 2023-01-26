import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			state.push(action.payload)
		}
	}
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
		dispatch(setBlogs(sortedBlogs))
	}
}

export const createBlog = (content) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(content)
			dispatch(appendBlog(newBlog))
			dispatch(setNotification('success',
				`a new blog "${newBlog.title}" by ${newBlog.author} added!`))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}
}

export default blogSlice.reducer