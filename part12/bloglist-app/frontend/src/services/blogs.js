import axios from '../utils/apiClient'
const baseUrl = '/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response.data
}

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject)
	return response.data
}

const createComment = async (id, commentObject) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)
	return response.data
}

const remove = async (id) => {
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.delete(`${baseUrl}/${id}`, config)
	return response.data
}

const exportObject = { getAll, create, update, remove, setToken, createComment }

export default exportObject