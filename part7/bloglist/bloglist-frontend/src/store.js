import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import credentialReducer from './reducers/credentialReducer.js'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		credentials: credentialReducer
	}
})

export default store