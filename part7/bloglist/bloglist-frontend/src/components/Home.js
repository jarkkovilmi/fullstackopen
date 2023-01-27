import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog, addLike, deleteBlogById } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Home = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.credentials.user)

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		try {
			dispatch(createBlog(blogObject))
			dispatch(setNotification('success', `a new blog "${blogObject.title}" by ${blogObject.author} added!`))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	const like = (blogObject) => {
		try {
			dispatch(addLike(blogObject))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	const deleteBlog = (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			try {
				console.log(blog)
				dispatch(deleteBlogById(blog.id))
			} catch(e) {
				dispatch(setNotification('error', e.response.data.error))
			}
		}
	}

	const blogFormRef = useRef()

	return (
		<div>
			<Togglable buttonLabel="create a new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			{blogs.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					user={user}
					like={() => like(blog)}
					deleteBlog={() => deleteBlog(blog)}
				/>
			)}
		</div>
	)
}

export default Home