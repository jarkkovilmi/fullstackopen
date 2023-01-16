import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
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

	const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

	return (
		<div style={blogStyle}>
			<div>
			"{blog.title}" by {blog.author}
				<button style={hideWhenVisible} onClick={toggleShowAll}>view</button>
				<button style={showWhenVisible} onClick={toggleShowAll}>hide</button>
			</div>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes}
					<button value={blog.id} onClick={addLike}>like</button>
				</div>
				<div>{blog.user.name}</div>
				{blog.user.name === loggedUser.name &&
				<button value={blog.id} onClick={deleteBlog}>remove</button>}
			</div>
		</div>  
)}

export default Blog