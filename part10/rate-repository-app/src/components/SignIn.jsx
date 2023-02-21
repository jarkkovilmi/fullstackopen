import { Formik } from 'formik';
import * as yup from 'yup';
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
	const onSubmit = (values) => {
		console.log(values);
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