import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const sortingMethods = {
	latest: {
		orderBy: 'CREATED_AT',
		orderDirection: 'DESC'
	},
	rating_desc: {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'DESC'
	},
	rating_asc: {
		orderBy: 'RATING_AVERAGE',
		orderDirection: 'ASC'
	}
};

const useRepositories = ({ sortingMethod, searchKeyword }) => {
	const variables = {
		...sortingMethods[sortingMethod],
		searchKeyword
	};

	const { data } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables
	});

  return { repositories: data?.repositories };
};

export default useRepositories;