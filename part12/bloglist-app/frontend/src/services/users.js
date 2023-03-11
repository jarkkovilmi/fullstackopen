import axios from '../utils/apiClient'
const baseUrl = '/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const exportObject = { getAll }

export default exportObject