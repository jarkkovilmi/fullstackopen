import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import Text from '../Text';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from '../ItemSeparator';
import useSingleRepository from '../../hooks/useSingleRepository';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
	return <RepositoryItem repository={repository} single={true} />;
};

const SingleRepository = () => {
	const { id } = useParams();
	const { repository, loading, fetchMore } = useSingleRepository({
		id,
		first: 4
  });

	const reviews = repository
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	if (loading) {
		return <View><Text>loading...</Text></View>;
  }

	const onEndReach = () => {
		fetchMore();
  };

	return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
			ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() =>
				<>
					<RepositoryInfo repository={repository} />
					<ItemSeparator />
				</>
			}
			onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;