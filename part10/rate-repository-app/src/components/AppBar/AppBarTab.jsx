import { StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  tab: {
		marginHorizontal: 10
  }
});

const AppBarTab = ({ text, ...props }) => (
	<Text
		style={styles.tab}
		color='textAppBar'
		fontWeight='bold'
		{...props}
	>
		{text}
	</Text>
);

export default AppBarTab;