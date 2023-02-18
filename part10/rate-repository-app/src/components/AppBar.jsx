import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
		padding: 20
  },
	text: {
    color: theme.colors.appBarText
  }
});

const AppBar = () => {
  return (
		<View style={styles.container}>
			<Link to="/">
				<AppBarTab text='Repositories' />
			</Link>
			<Link to="/signin">
				<AppBarTab text='Sign in' />
			</Link>
		</View>
	);
};

export default AppBar;