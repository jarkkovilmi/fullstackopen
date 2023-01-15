import { useState } from 'react'

const Blog = ({blog}) => {
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

	return (
		<div style={blogStyle}>
			<div>
			{blog.title} {blog.author}
				<button style={hideWhenVisible} onClick={toggleShowAll}>view</button>
				<button style={showWhenVisible} onClick={toggleShowAll}>hide</button>
			</div>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>likes {blog.likes}</div>
				<div>{blog.user.name}</div>
			</div>
		</div>  
)}

export default Blog