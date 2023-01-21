import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload)
		},
		addVote(state, action) {
			const id = action.payload
			const anecdoteToChange = state.find(a => a.id === id)
			const updatedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1 
			}
			const updatedAnecdotes = state.map(a => a.id !== id ? a : updatedAnecdote)
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

export const { createAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer