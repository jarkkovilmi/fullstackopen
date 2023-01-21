import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateVotes(state, action) {
			const updatedAnecdote = action.payload
			const updatedAnecdotes = state.map(a => 
				a.id !== updatedAnecdote.id ? a : updatedAnecdote)
			return updatedAnecdotes.sort((a, b) => b.votes - a.votes)
		},
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
	}
})

export const { appendAnecdote, setAnecdotes, updateVotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
		const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    dispatch(setAnecdotes(sortedAnecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = ({ content, id, votes }) => {
  return async (dispatch) => {
		console.log(votes)
		const object = {
				content,
				votes: votes + 1
		}
    const newNote = await anecdoteService.update(id, object)
		console.log(newNote.votes)
    dispatch(updateVotes(newNote))
  }
}

export default anecdoteSlice.reducer