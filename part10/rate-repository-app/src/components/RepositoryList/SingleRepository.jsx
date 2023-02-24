import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import Text from '../Text';
import theme from '../../theme';
import { GET_REPOSITORY } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from '../ItemSeparator';
import formatDate from '../../utils/formatDate';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: '#FFF'
  },
	containerRow: {
		flexDirection: 'row',
		padding: 10
	},
	infoContainer: {
		flexDirection: 'column',
		paddingLeft: 15,
		flexShrink: 1
	},
	ratingBox: {
    width: 50,
    height: 50,
		borderRadius: 30,
		borderColor: theme.colors.primary,
		borderWidth: 2,
		color: theme.colors.primary,
		justifyContent: 'center',
		alignItems: 'center'
  },
	reviewText: {
		marginBottom: 5
	},
	nameText: {
		marginBottom: 5
	}
});

const RepositoryInfo = ({ repository }) => {
	return <RepositoryItem repository={repository} single={true} />;
};

const ReviewItem = ({ review }) => {
  return (
		<View style={styles.container} testID="repositoryItem">
			<View style={styles.containerRow}>
				<View style={styles.ratingBox}>
					<Text fontWeight="bold" color="primary" fontSize='subheading'>
						{review.rating}
					</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.nameText} fontWeight='bold'>{review.user.username}</Text>
					<Text style={styles.reviewText} color='textSecondary'>
						{formatDate(review.createdAt)}
					</Text>
					<Text style={styles.language}>{review.text}</Text>
				</View>
			</View>
		</View>
	);
};

const SingleRepository = () => {
	const { id } = useParams();
	const { data, loading }  = useQuery(GET_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
		variables: { id },
	});

	const repository = data?.repository;

	const reviews = repository
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	if (loading)  {
		return <View><Text>loading...</Text></View>;
  }

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
    />
  );
};

export default SingleRepository;