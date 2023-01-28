// import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addLike, deleteBlogById, addComment } from '../reducers/blogReducer'

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
			<a href={blog.url}>{blog.url}</a>
			<div>
				{blog.likes} likes
				<button value={blog.id} onClick={() => dispatch(addLike(blog))}>like</button>
			</div>
			<div>added by {blog.user.name}</div>
			{blog.user.name === user.name &&
			<button value={blog.id} onClick={() => deleteBlog(blog)}>remove</button>}
			<h3>comments</h3>
			<form onSubmit={newComment}>
				<div>
					<input name="comment"></input>
					<button type="submit">add comment</button>
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