import { StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  tab: {
		marginLeft: 10
  }
});

const AppBarTab = ({ text }) => (
	<Text style={styles.tab} color='textAppBar' fontWeight='bold'>{text}</Text>
);

export default AppBarTab;