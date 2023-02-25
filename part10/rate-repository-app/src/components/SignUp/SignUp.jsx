import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';
import SignUpForm from './SignUpForm';

const initialValues = {
  username: '',
  password: '',
	passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Too short username')
    .max(30, 'Too long username')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Too short password')
    .max(50, 'Too long password')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), 'null'], 'Passwords have to match')
    .required('Password confirmation is required'),
});

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
			if (data.createUser) {
				await signIn({ username, password });
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;