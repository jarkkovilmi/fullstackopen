import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

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

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
			console.log(data)
      const addedBook = data.data.bookAdded
      notify(`Book "${addedBook.title}" added`)
			updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: null } }, addedBook)
		}
  })

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
				{token
					? <>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommend')}>recommend</button>
						<button onClick={logout}>logout</button>
						</>
					:	<button onClick={() => setPage('login')}>login</button>
				}
      </div>
			<Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
			{token &&
      <NewBook show={page === 'add'} setError={notify} />}
      <LoginForm show={page === 'login'} setToken={setToken} setError={notify}
				setPage={setPage} />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App 
