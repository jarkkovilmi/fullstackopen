import './index.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser, setUser } from './reducers/credentialReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.credentials.user)
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
		dispatch(setLoggedUser())
	}, [dispatch])

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
		navigate('/')
	}

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
			<p>{user.name} logged in<br/>
				<button onClick={() => handleLogout()}>logout</button>
			</p>
			<Routes>
				<Route path="/" element={<Blogs />}/>
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<User />} />
				<Route path="/blogs/:id" element={<Blog />} />
			</Routes>
		</div>
	)
}

export default App
