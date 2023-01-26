import './index.css'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/credentialReducer'

const App = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.credentials.user)

	useEffect(() => {
		dispatch(initializeBlogs())

		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		}
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

	const addLike = async (blog) => {
		const blogObject = {
			...blog,
			likes: blog.likes + 1
		}
		try {
			await blogService.update(blog.id, blogObject)
			const updatedBlogs = await blogService.getAll()
			dispatch(setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes)))
			// setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)))
		} catch(e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			try {
				await blogService.remove(blog.id)
				dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
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
					addLike={() => addLike(blog)}
					deleteBlog={() => deleteBlog(blog)}
				/>
			)}
		</div>
	)

}

export default App
