import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

const Users = () => {
	const users = useSelector(state => state.users)

	return (
		<div>
			<h2>Users</h2>
			<table>
				<tbody>
					<tr>
						<td></td>
						<td><strong>blogs created</strong></td>
					</tr>
					{users.map(user => (
						<tr key={user.id}>
							<td><Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link></td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Users