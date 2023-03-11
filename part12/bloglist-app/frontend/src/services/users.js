// import axios from 'axios'
import axios from '../utils/apiClient'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const exportObject = { getAll }

export default exportObject