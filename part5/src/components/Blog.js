import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
	const [showAll, setShowAll] = useState(false)

	const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

	const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }
	
	const toggleShowAll = () => setShowAll(!showAll)

	const likeHandler = async (event) => {
		const blogId = event.target.value
		const blogObject = {
			...blog,
			likes: blog.likes +1
		}
		await blogService.update(blogId, blogObject)
		const blogs = await blogService.getAll()
		setBlogs(blogs)
	}

	return (
		<div style={blogStyle}>
			<div>
			{blog.title} {blog.author}
				<button style={hideWhenVisible} onClick={toggleShowAll}>view</button>
				<button style={showWhenVisible} onClick={toggleShowAll}>hide</button>
			</div>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button value={blog.id} onClick={likeHandler}>like</button>
				</div>
				<div>{blog.user.name}</div>
			</div>
		</div>  
)}

export default Blog