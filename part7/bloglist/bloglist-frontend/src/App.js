import './index.css'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
// import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike, removeBlog } from './reducers/blogReducer'
import { setLoggedUser, setUser } from './reducers/credentialReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.credentials.user)

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(setLoggedUser())
	}, [dispatch])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
	}

	const addBlog = async (blogObject) => {
		noteFormRef.current.toggleVisibility()
		try {
			dispatch(createBlog(blogObject))
			dispatch(setNotification('success', `a new blog "${blogObject.title}" by ${blogObject.author} added!`))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	const like = async (blogObject) => {
		try {
			dispatch(addLike(blogObject))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			try {
				dispatch(removeBlog(blog.id))
			} catch(e) {
				dispatch(setNotification('error', e.response.data.error))
			}
		}
	}

	const noteFormRef = useRef()

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification />
				<LoginForm />
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
			<p>{user.name} logged in
				<button onClick={() => handleLogout()}>logout</button>
			</p>
			<Togglable buttonLabel="create a new blog" ref={noteFormRef}>
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

export default App
