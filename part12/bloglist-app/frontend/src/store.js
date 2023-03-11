import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import credentialReducer from './reducers/credentialReducer.js'
import userReducer from './reducers/userReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		credentials: credentialReducer,
		users: userReducer
	}
})

export default store