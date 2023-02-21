import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
		marginLeft: 10
  }
});

const AppBarTab = ({ text }) => {
	return (
		// <Pressable>
			<Text style={styles.tab} color={'textAppBar'}>{text}</Text>
		// </Pressable>
	);
};

export default AppBarTab;