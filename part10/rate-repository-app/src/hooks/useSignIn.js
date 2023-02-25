import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({
			variables: { credentials: { username , password } }
		});
		await authStorage.setAccessToken(response.data.authenticate.accessToken);
		apolloClient.resetStore();
		return response;
  };

  return [signIn, result];
};

export default useSignIn;