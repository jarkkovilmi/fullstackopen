import { View } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Text from '../Text';
import { GET_REPOSITORY } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
	const { id } = useParams();
	const { data, loading }  = useQuery(GET_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: { id },
	});

	const repository = data?.repository;

	if (loading)  {
		return <View><Text>loading...</Text></View>;
  }

	return (
		<RepositoryItem repository={repository} single={true} />
	);
};

export default SingleRepository;