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
		updateBlogs(state, action) {
			const updatedBlog = action.payload
			const updatedBlogs = state.map(a =>
				a.id !== updatedBlog.id ? a : updatedBlog)
			return updatedBlogs.sort((a, b) => b.likes - a.likes)
		}
	}
})

export const { setBlogs, appendBlog, updateBlogs, updateComments, removeBlog } = blogSlice.actions

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
			dispatch(appendBlog(newBlog))
			dispatch(setNotification('success',
				`a new blog "${newBlog.title}" by ${newBlog.author} added!`))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}
}

export const deleteBlogById = (blogId) => {
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
		const returnedObject = await blogService.update(object.id, newObject)
		dispatch(updateBlogs(returnedObject))
	}
}

export const addComment = (blogId, comment) => {
	return async (dispatch) => {
		const returnedObject = await blogService.createComment(blogId, comment)
		dispatch(updateBlogs(returnedObject))
	}
}

export default blogSlice.reducer