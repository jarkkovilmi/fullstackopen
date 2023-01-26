import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const handleChange = (event) => {
		setNewBlog({
			...newBlog,
			[event.target.name]: event.target.value
		})
	}

	const addBlog = async (event) => {
		event.preventDefault()
		createBlog({
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		})
		setNewBlog({ author: '', title: '', url: '' })
	}

	return (
		<div>
			<h2>create new</h2>

			<form onSubmit={addBlog}>
				<div>title:
					<input id="titleInput" name="title" value={newBlog.title} onChange={handleChange}></input>
				</div>
				<div>author:
					<input id="authorInput" name="author" value={newBlog.author} onChange={handleChange}></input>
				</div>
				<div>url:
					<input id="urlInput" name="url" value={newBlog.url} onChange={handleChange}></input>
				</div>
				<button id="createBlogButton" type="submit">create</button>
			</form>

		</div>
	)
}

export default BlogForm