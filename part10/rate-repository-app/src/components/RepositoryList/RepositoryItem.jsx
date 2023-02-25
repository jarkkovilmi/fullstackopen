import { Image, View, StyleSheet, Linking, Pressable } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import Statistics from './Statistics';

const styles = StyleSheet.create({
  container: {
		padding: 10,
		backgroundColor: '#FFF'
  },
	containerRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 10
	},
	infoContainer: {
		flexDirection: 'column',
		paddingLeft: 15,
		flexShrink: 1
	},
	language: {
		alignSelf: 'flex-start',
		padding: 6,
		margin: 5,
		borderRadius: 4,
		backgroundColor: theme.colors.primary,
		color: theme.colors.appBarText
	},
  avatar: {
    width: 50,
    height: 50,
		borderRadius: 4
  },
	buttonContainer: {
		padding: 12,
		margin: 5,
		borderRadius: 4,
		backgroundColor: theme.colors.primary,
		color: theme.colors.appBarText,
		marginTop: 20
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontWeight: theme.fontWeights.bold,
	},
	descriptionText: {
		margin: 5
	},
	nameText: {
		margin: 5
	}
});

const RepositoryItem = ({ repository, single = false }) => {
	return (
		<View style={styles.container} testID="repositoryItem">
			<View style={styles.containerRow}>
				<View>
					<Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.nameText} fontWeight='bold'>{repository.fullName}</Text>
					<Text style={styles.descriptionText} color='textSecondary'>{repository.description}</Text>
					<Text style={styles.language}>{repository.language}</Text>
				</View>
			</View>
			<Statistics
				stars={repository.stargazersCount}
				forks={repository.forksCount}
				reviews={repository.reviewCount}
				rating={repository.ratingAverage}
			/>
			{single && (
				<View style={styles.buttonContainer}>
					<Pressable onPress={() => Linking.openURL(repository.url)}>
						<Text style={styles.buttonText}>Open in GitHub</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default RepositoryItem;