import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const Notify = ({ errorMessage }) => {
	if ( !errorMessage ) {
		return null
	}
	return (
		<div style={{color: 'red'}}>
			{errorMessage}
		</div>
	)
}

const App = () => {
  const [page, setPage] = useState('authors')
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
		setPage('authors')
  }

	const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && 
				<button onClick={() => setPage('add')}>add book</button>}
				{token ?
				<button onClick={logout}>logout</button>
				:
        <button onClick={() => setPage('login')}>login</button>
				}
      </div>
			<Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
			{token &&
      <NewBook show={page === 'add'} setError={notify} />}
      <LoginForm show={page === 'login'} setToken={setToken} setError={notify}
				setPage={setPage} />
    </div>
  )
}

export default App
