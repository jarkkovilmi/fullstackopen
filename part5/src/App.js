import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))  
  }, [])

	useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleLogout = (event) => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const handleChange = (event) => {
		console.log(event.target.value)
		setNewBlog({
			...newBlog,
			[event.target.name]: event.target.value
		})
		console.log(newBlog)
	}

	const addBlog = (event) => {
		event.preventDefault()
		console.log(newBlog)
		const blogObject = {
			title: newBlog.title,
			author: newBlog.author,
			url: newBlog.url,
		}

		blogService
			.create(blogObject)
			.then(returnedNote => {
				setBlogs(blogs.concat(returnedNote))
				setNewBlog({ author: '', title: '', url: '' })
			})
	}

  if (user === null) {
    return (
      <div>
				<h1>debug: {errorMessage}</h1>
        <h2>Log in to application</h2>
        <LoginForm 
					handleLogin={handleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
			<p>{user.name} logged in
				<button onClick={() => handleLogout()}>logout</button>
			</p> 
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
				)}
    </div>
  )

}

export default App
