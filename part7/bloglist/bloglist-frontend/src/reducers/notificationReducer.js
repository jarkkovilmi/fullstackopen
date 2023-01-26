/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	message: '',
	type: ''
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(state, action) {
			return {
				type: action.payload.type,
				message: action.payload.message
			}
		},
		removeNotification(state, action) {
			return initialState
		}
	}
})

let notificationTimer

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (type, message) => {
	return (dispatch) => {
		clearTimeout(notificationTimer)
		dispatch(showNotification({ type, message }))
		notificationTimer = setTimeout(() => {dispatch(removeNotification())}, 5000)
	}
}

export default notificationSlice.reducer