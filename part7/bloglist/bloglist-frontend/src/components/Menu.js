import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/credentialReducer'

const Menu = ({ user }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const padding = {
		paddingRight: 5
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
		navigate('/')
	}

	return (
		<div>
			<Link style={padding} to="/">blogs</Link>
			<Link style={padding} to="/users">users</Link>
			{user.name} logged in <button onClick={() => handleLogout()}>logout</button>
		</div>
	)
}

export default Menu