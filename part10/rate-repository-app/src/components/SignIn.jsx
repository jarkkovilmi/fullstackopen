import { StyleSheet, View, Pressable } from 'react-native';
import { Formik } from 'formik';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  container: {
		backgroundColor: '#FFF',
		padding: 15
  },
	input: {
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: theme.colors.mainBackground,
		borderRadius: 4,
		margin: 5,
		padding: 10
	},
	submit: {
		backgroundColor: theme.colors.primary,
		margin: 5,
		padding: 10,
		borderRadius: 4,
		alignItems: 'center'
	}
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
			<FormikTextInput
				style={styles.input}
				name="username"
				placeholder="Username"
			/>
      <FormikTextInput
				secureTextEntry={true}
				style={styles.input}
				name="password"
				placeholder="Password"
			/>
      <Pressable style={styles.submit} onPress={onSubmit}>
        <Text fontWeight='bold' color='textAppBar'>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
	const onSubmit = (values) => {
		console.log(values);
	};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;