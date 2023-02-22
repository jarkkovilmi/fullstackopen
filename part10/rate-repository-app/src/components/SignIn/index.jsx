import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../../hooks/useSignIn';
import SignInForm from './SignInForm';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Too short username')
    .required('Username is required'),
  password: yup
    .string()
    .min(3, 'Too short password')
    .required('Password is required'),
});

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
			if (data.authenticate.accessToken) {
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;