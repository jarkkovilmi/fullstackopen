import './index.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/credentialReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.credentials.user)

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUsers())
		dispatch(setLoggedUser())
	}, [dispatch])

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
			<Menu user={user} />
			<h2>blog app</h2>
			<Notification />
			<Routes>
				<Route path="/" element={<Blogs />}/>
				<Route path="/blogs/:id" element={<Blog />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<User />} />
			</Routes>
		</div>
	)
}

export default App
