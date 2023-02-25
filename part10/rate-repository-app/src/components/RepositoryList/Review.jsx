import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../../hooks/useCreateReview';
import ReviewForm from './ReviewForm';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Username of the repository\'s owner is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Give a value between 0 and 100')
    .max(100, 'Give a value between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
});

export const ReviewContainer = ({ onSubmit }) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const Review = () => {
	const [createReview] = useCreateReview();
	const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, text } = values;
		const rating = Number(values.rating);
    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

	return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;