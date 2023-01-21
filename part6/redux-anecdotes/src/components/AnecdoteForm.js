import { connect } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
	const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
		setNotification(`added "${content}"`, 5)
  }

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
		</div>
	)
}

const mapDispatchToProps = { createAnecdote, setNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)