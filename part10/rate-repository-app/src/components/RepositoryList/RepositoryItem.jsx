import { Image, View, StyleSheet } from 'react-native';
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
	info: {
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
    width: 60,
    height: 60,
		borderRadius: 4
  },
});

const RepositoryItem = ({ item }) => {
	return (
		<View style={styles.container} testID="repositoryItem">
			<View style={styles.containerRow}>
				<View>
					<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
				</View>
				<View style={styles.info}>
					<Text style={{ margin: 5 }} fontWeight='bold'>{item.fullName}</Text>
					<Text style={{ margin: 5 }} color='textSecondary'>{item.description}</Text>
					<Text style={styles.language}>{item.language}</Text>
				</View>
			</View>
			<Statistics
				stars={item.stargazersCount}
				forks={item.forksCount}
				reviews={item.reviewCount}
				rating={item.ratingAverage}
			/>
		</View>
	);
};

export default RepositoryItem;