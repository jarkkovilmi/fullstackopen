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

const useRepositories = ({ sortingMethod, searchKeyword, first }) => {
	const variables = {
		...sortingMethods[sortingMethod],
		searchKeyword,
		first
	};

	const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
		variables
	});

	const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
		repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
	};
};

export default useRepositories;