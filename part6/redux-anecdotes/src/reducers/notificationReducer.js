import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		showNotification(state, action) {
			return action.payload
		},
		removeNotification(state, action) {
			return null
		}
	}
})

let notificationTimer

export const { showNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
	return (dispatch) => {
		clearTimeout(notificationTimer)
		dispatch(showNotification(notification))
		notificationTimer = setTimeout(() => {dispatch(removeNotification())}, seconds * 1000)
	}
}

export default notificationSlice.reducer