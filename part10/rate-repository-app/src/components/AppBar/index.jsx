import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';

import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { GET_CURRENT_USER } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
		flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
		padding: 20
  },
	tab: {
		marginHorizontal: 10
  }
});

const AppBar = () => {
	const { data } = useQuery(GET_CURRENT_USER);
	const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
	const authenticated = data?.me;

	const signOut = async () => {
		await authStorage.removeAccessToken();
    apolloClient.resetStore();
	};

  return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<Link to="/">
					<AppBarTab text='Repositories' />
				</Link>
				{authenticated
					?
					<AppBarTab text='Sign out' onPress={signOut} />
					:
					<Link to="/signin">
						<AppBarTab style={styles.tab} text='Sign in' />
					</Link>
				}
			</ScrollView>
		</View>
	);
};

export default AppBar;