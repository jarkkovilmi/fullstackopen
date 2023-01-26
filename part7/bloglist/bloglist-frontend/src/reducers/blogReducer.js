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
		},
		removeBlog(state, action) {
			return state.filter(b => b.id !== action.payload)
		},
		updateLikes(state, action) {
			const updatedBlog = action.payload
			const updatedBlogs = state.map(a =>
				a.id !== updatedBlog.id ? a : updatedBlog)
			return updatedBlogs.sort((a, b) => b.likes - a.likes)
		}
	}
})

export const { setBlogs, appendBlog, updateLikes, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
		dispatch(setBlogs(sortedBlogs))
	}
}

export const createBlog = (object) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(object)
			initializeBlogs()
			dispatch(setNotification('success',
				`a new blog "${newBlog.title}" by ${newBlog.author} added!`))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}
}

export const deleteBlog = (blogId) => {
	return async (dispatch) => {
		try {
			await blogService.remove(blogId)
			dispatch(removeBlog(blogId))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}
}

export const addLike = (object) => {
	return async (dispatch) => {
		const newObject = {
			...object,
			likes: object.likes + 1
		}
		await blogService.update(object.id, newObject)
		dispatch(updateLikes(newObject))
	}
}

export default blogSlice.reducer