import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Table, TableBody, TableCell, TableContainer, TableRow,
	Paper, Link } from '@mui/material'

const Blogs = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		dispatch(createBlog(blogObject))
	}

	const blogFormRef = useRef()

	return (
		<div>
			<Togglable buttonLabel="create a new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{blogs.map(blog => (
							<TableRow key={blog.id}>
								<TableCell>
									<Link component={RouterLink} to={`/blogs/${blog.id}`}>&quot;{blog.title}&quot; by {blog.author}</Link>
								</TableCell>
								<TableCell>
									{blog.author}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Blogs