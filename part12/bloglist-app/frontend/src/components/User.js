import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { List, ListItem } from '@mui/material'

const User = () => {
	const id = useParams().id
	const users = useSelector(state => state.users)
	const user = users.find(user => user.id === id)

	if (!user) {
		return null
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<List>
				{user.blogs.map(blog => (
					<ListItem disablePadding key={blog.id}>{blog.title}</ListItem>
				))}
			</List>
		</div>
	)
}

export default User