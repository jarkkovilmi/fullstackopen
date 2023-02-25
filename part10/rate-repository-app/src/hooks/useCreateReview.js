import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
	const [review, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
		const response = await review({
			variables: { review: { ownerName, repositoryName, rating, text } }
		});
		return response;
  };

  return [createReview, result];
};

export default useCreateReview;