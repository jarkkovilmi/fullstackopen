import { useSelector, useDispatch } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'

const Anecdote = ({ key, content, votes, onClick }) => {
	return (
		<div key={key}>
		<div>{content}</div>
		<div>
			has {votes}
			<button onClick={onClick}>vote</button>
		</div>
	</div>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    console.log('vote', id)
		dispatch(createVote(id))
  }

	return (
		<div>
			{anecdotes.map(anecdote =>
				<Anecdote 
					key={anecdote.id}
					content={anecdote.content}
					votes={anecdote.votes}
					onClick={() => vote(anecdote.id)}
				/>
			)}
		</div>
	)
}

export default AnecdoteList