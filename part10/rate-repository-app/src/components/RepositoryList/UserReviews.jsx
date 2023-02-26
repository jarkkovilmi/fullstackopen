import { View, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import ItemSeparator from '../ItemSeparator';
import Text from '../Text';
import { GET_CURRENT_USER } from '../../graphql/queries';
import ReviewItem from './ReviewItem';

const UserReviews = () => {
	const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true }
  });

	const reviews = data
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];

	if (loading) {
		return <View><Text>loading...</Text></View>;
  }

	return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
				<ReviewItem review={item} user={true} refetch={refetch} />
			)}
      keyExtractor={({ id }) => id}
			ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;