import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null,
	username: '',
	password: ''
}

const credentialSlice = createSlice({
	name: 'credentials',
	initialState,
	reducers: {
		setUser(state, action) {
			if (!action.payload)
				return initialState
			return {
				username: '',
				password: '',
				user: {
					name: action.payload.name,
					token: action.payload.token,
					username: action.payload.username
				}
			}
		},
		setUsername(state, action) {
			return {
				...state,
				username: action.payload
			}
		},
		setPassword(state, action) {
			return {
				...state,
				password: action.payload
			}
		}
	}
})

export const { setUsername, setPassword, setUser } = credentialSlice.actions

export default credentialSlice.reducer