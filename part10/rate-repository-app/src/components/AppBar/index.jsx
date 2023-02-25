import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

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
		paddingVertical: 20
  }
});

const AppBar = () => {
	const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
	const navigate = useNavigate();

	const { data } = useQuery(GET_CURRENT_USER);
	const authenticated = data?.me;

	const signOut = async () => {
		await authStorage.removeAccessToken();
    apolloClient.resetStore();
		navigate('/');
	};

  return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab to="/">Repositories</AppBarTab>
				{authenticated ?
					<>
						<AppBarTab to="/review">Create a review</AppBarTab>
						<AppBarTab onPress={signOut}>Sign out</AppBarTab>
					</>
					:
					<>
						<AppBarTab to="/signin">Sign in</AppBarTab>
						<AppBarTab to="/signup">Sign up</AppBarTab>
					</>
				}
			</ScrollView>
		</View>
	);
};

export default AppBar;