import { gql } from '@apollo/client';

export const REPOSITORY_BASE_FIELDS = gql`
  fragment repositoryBaseFields on Repository {
    id
    name
    ownerName
    fullName
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
    createdAt
		reviewCount
		ratingAverage
  }
`;

export const USER_BASE_FIELDS = gql`
  fragment userBaseFields on User {
    id
    username
    createdAt
  }
`;

export const REVIEW_BASE_FIELDS = gql`
  fragment reviewBaseFields on Review {
    id
		text
		rating
		createdAt
		repository {
			fullName
			id
		}
		user {
			id
			username
		}
  }
`;