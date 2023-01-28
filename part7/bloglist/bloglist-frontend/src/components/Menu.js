import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { setUser } from '../reducers/credentialReducer'
import { Link, Chip, Button } from '@mui/material'

const Menu = ({ user }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const padding = {
		paddingRight: 5
	}

	const label = `${user.name} logged in`

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
		navigate('/')
	}

	return (
		<div>
			<Link component={RouterLink} style={padding} to="/">blogs</Link>
			<Link component={RouterLink} style={padding} to="/users">users</Link>
			<Chip variant="plain" label={label} size="lg" /><Button onClick={() => handleLogout()}>logout</Button>
		</div>
	)
}

export default Menu