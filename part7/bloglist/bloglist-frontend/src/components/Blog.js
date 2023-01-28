import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addLike, deleteBlogById, addComment } from '../reducers/blogReducer'
import { Divider, Button } from '@mui/material'

const Blog = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const id = useParams().id

	const user = useSelector(state => state.credentials.user)
	const blogs = useSelector(state => state.blogs)
	const blog = blogs.find(blogs => blogs.id === id)

	const deleteBlog = (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			dispatch(deleteBlogById(blog.id))
			navigate('/')
		}
	}

	const newComment = (event) => {
		event.preventDefault()
		const comment = { comment: event.target.comment.value }
		dispatch(addComment(blog.id, comment ))
		event.target.reset()
	}

	if (!blog) {
		return null
	}

	return (
		<div>
			<h2>&quot;{blog.title}&quot; by {blog.author}</h2>
			<a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
			<div>
				{blog.likes} likes
				<Button sx={{ m: 1 }} variant="contained" color="primary"
					value={blog.id} onClick={() => dispatch(addLike(blog))}>like</Button>
			</div>
			<div>added by {blog.user.name}</div>
			{blog.user.name === user.name &&
			<Button value={blog.id} sx={{ m: 1 }} variant="contained" color="error"
				onClick={() => deleteBlog(blog)}>remove</Button>}
			<Divider></Divider>
			<h3>comments</h3>
			<form onSubmit={newComment}>
				<div>
					<input name="comment"></input>
					<Button sx={{ m: 1 }} variant="contained" color="primary" type="submit">
						add comment
					</Button>
				</div>
			</form>
			<ul>
				{blog.comments.map((comment, index) => (
					<li key={index}>{comment}</li>
				))}
			</ul>
		</div>
	)
}

export default Blog