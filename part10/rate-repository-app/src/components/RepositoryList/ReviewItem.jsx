import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import formatDate from '../../utils/formatDate';
import { useNavigate } from 'react-router-native';
import useDeleteReview from '../../hooks/useDeleteReview';

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
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	buttonView: {
		backgroundColor: theme.colors.primary,
		margin: 5,
		padding: 10,
		borderRadius: 4,
		alignItems: 'center',
		flexGrow: 1
	},
	buttonDelete: {
		backgroundColor: theme.colors.error,
		margin: 5,
		padding: 10,
		borderRadius: 4,
		alignItems: 'center',
		flexGrow: 1
	}
});

const ReviewItem = ({ review, user = false, refetch }) => {
	const [deleteReview] = useDeleteReview();
	const navigate = useNavigate();

	const handleDelete = (id) => {
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'DELETE', onPress: async () => {
					try {
						await deleteReview({ id });
						await refetch({ includeReviews: true });
					} catch (e) {
						console.log(e);
					}
				}
			}
		]);
	};

  return (
		<View style={styles.container} testID="repositoryItem">
			<View style={styles.containerRow}>
				<View style={styles.ratingBox}>
					<Text fontWeight="bold" color="primary" fontSize='subheading'>
						{review.rating}
					</Text>
				</View>
				<View style={styles.infoContainer}>
					{user ?
						<Text style={styles.nameText} fontWeight='bold'>
							{review.repository.fullName}
						</Text>
						:
						<Text style={styles.nameText} fontWeight='bold'>
							{review.user.username}
						</Text>
					}
					<Text style={styles.reviewText} color='textSecondary'>
						{formatDate(review.createdAt)}
					</Text>
					<Text style={styles.language}>{review.text}</Text>
				</View>
			</View>
			{user &&
				<View style={styles.buttonContainer}>
					<Pressable
						style={styles.buttonView}
						onPress={() => navigate(`/${review.repository.id}`)}
					>
						<Text fontWeight='bold' color='textAppBar'>View repository</Text>
					</Pressable>
					<Pressable style={styles.buttonDelete} onPress={() => handleDelete(review.id)}>
						<Text fontWeight='bold' color='textAppBar'>Delete review</Text>
					</Pressable>
				</View>
			}
		</View>
	);
};

export default ReviewItem;