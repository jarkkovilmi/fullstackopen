import { gql } from '@apollo/client';
import { USER_BASE_FIELDS } from './fragments';

export const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
	mutation createReview($review: CreateReviewInput!) {
		createReview(review: $review) {
			repositoryId
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($user: CreateUserInput!) {
		createUser(user: $user) {
			...userBaseFields
		}
	}

	${USER_BASE_FIELDS}
`;

export const DELETE_REVIEW = gql`
	mutation deleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;