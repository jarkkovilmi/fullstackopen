import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(blogObject))
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const blogFormRef = useRef()

	return (
		<div>
			<Togglable buttonLabel="create a new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			{blogs.map(blog =>
				<div style={blogStyle} key={blog.id}>
					<Link to={`/blogs/${blog.id}`}>&quot;{blog.title}&quot; by {blog.author}</Link>
				</div>
			)}
		</div>
	)
}

export default Blogs