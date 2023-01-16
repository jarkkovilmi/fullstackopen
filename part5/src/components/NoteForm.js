import { useState } from 'react'

const NoteForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const handleChange = (event) => {
		console.log(event.target.value)
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
					<input name="title" value={newBlog.title} onChange={handleChange}></input>
				</div>
				<div>author:
					<input name="author" value={newBlog.author} onChange={handleChange}></input>
				</div>
				<div>url:
					<input name="url" value={newBlog.url} onChange={handleChange}></input>
				</div>
				<button type="submit">create</button>
			</form>

		</div>
	)
}

export default NoteForm