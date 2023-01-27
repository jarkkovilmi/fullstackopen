import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlogById } from '../reducers/blogReducer'

const Blog = () => {
	const dispatch = useDispatch()
	const id = useParams().id

	const user = useSelector(state => state.credentials.user)
	const blogs = useSelector(state => state.blogs)
	const blog = blogs.find(blogs => blogs.id === id)

	const deleteBlog = (blog) => {
		if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
			dispatch(deleteBlogById(blog.id))
		}
	}

	if (!blog) {
		return null
	}

	return (
		<div>
			<h2>&quot;{blog.title}&quot; by {blog.author}</h2>
			<div>{blog.url}</div>
			<div>
				{blog.likes} likes
				<button value={blog.id} onClick={() => dispatch(addLike(blog))}>like</button>
			</div>
			<div>added by {blog.user.name}</div>
			{blog.user.name === user.name &&
			<button value={blog.id} onClick={() => deleteBlog(blog)}>remove</button>}
		</div>
	)
}

export default Blog