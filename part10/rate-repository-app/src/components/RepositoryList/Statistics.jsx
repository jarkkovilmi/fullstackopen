import { View, StyleSheet } from 'react-native';
import formatInThousands from '../../utils/formatInThousands';
import Text from '../Text';

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
	return (
		<View style={styles.containerRow}>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatInThousands(stars)}</Text>
				<Text color='textSecondary'>Stars</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatInThousands(forks)}</Text>
				<Text color='textSecondary'>Forks</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatInThousands(reviews)}</Text>
				<Text color='textSecondary'>Reviews</Text>
			</View>
			<View style={styles.containerColumn}>
				<Text fontWeight='bold'>{formatInThousands(rating)}</Text>
				<Text color='textSecondary'>Rating</Text>
			</View>
		</View>
	);
};

export default Statistics;