import { useSelector, useDispatch } from 'react-redux'
import { setPassword, setUsername, setUser } from '../reducers/credentialReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Button } from '@mui/material'

const LoginForm = () => {
	const dispatch = useDispatch()
	const { username, password } = useSelector(state => state.credentials)

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

			blogService.setToken(user.token)
			dispatch(setUser(user))
			dispatch(setNotification('success', `Logged in as ${user.name}!`))
		} catch (e) {
			dispatch(setNotification('error', e.response.data.error))
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => dispatch(setUsername(target.value))}
				/>
			</div>
			<div>
				password
				<input
					id="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => dispatch(setPassword(target.value))}
				/>
			</div>
			<Button sx={{ m: 1, px: 3 }} variant="contained" color="primary"
				id="login-button" type="submit">login</Button>
		</form>
	)
}

export default LoginForm