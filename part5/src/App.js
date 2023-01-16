import './index.css'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll()
			.then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const showNotification = (type, message) => {
		setNotification({ type: type, message: message })
		setTimeout(() => setNotification(null), 4000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (e) {
			showNotification('error', e.response.data.error)
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const addBlog = async (blogObject) => {
		noteFormRef.current.toggleVisibility()
		try {
			const returnedBlog = await blogService.create(blogObject)
			const updatedBlogs = await blogService.getAll()
			setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			// setBlogs(blogs.concat(returnedBlog))
			showNotification('success', `a new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`)
		} catch(e) {
			showNotification('error', e.response.data.error)
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
			setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
			// setBlogs(blogs.map((b) => (b.id !== returnedBlog.id ? b : returnedBlog)))
		} catch(e) {
			showNotification('error', e.response.data.error)
		}
	}

	const deleteBlog = async (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			try {
				await blogService.remove(blog.id)
				setBlogs(blogs.filter(b => b.id !== blog.id))
			} catch(e) {
				showNotification('error', e.response.data.error)
			}
		}
	}

	const noteFormRef = useRef()

	if (user === null) {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={notification} />
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			</div>
		)
	}

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={notification} />
			<p>{user.name} logged in
				<button onClick={() => handleLogout()}>logout</button>
			</p>
			<Togglable buttonLabel="create a new blog" ref={noteFormRef}>
				<NoteForm createBlog={addBlog} />
			</Togglable>
			{blogs.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					addLike={() => addLike(blog)}
					deleteBlog={() => deleteBlog(blog)}
				/>
			)}
		</div>
	)

}

export default App
