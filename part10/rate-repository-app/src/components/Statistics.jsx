import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
	containerRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	containerColumn: {
		flexDirection: 'column',
		alignItems: 'center'
	}
});

const Statistics = ({ stars, forks, reviews, rating }) => {
	const formatCount = (value) => {
		return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
	};

	return (
		<View style={styles.containerRow}>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatCount(stars)}</Text>
				<Text color='textSecondary'>Stars</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatCount(forks)}</Text>
				<Text color='textSecondary'>Forks</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatCount(reviews)}</Text>
				<Text color='textSecondary'>Reviews</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatCount(rating)}</Text>
				<Text color='textSecondary'>Rating</Text>
			</View>
		</View>
	);
};

export default Statistics;