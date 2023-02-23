import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
			edges {
				node {
					...repositoryBaseFields
					reviewCount
					ratingAverage
				}
    	}
    }
  }

	${REPOSITORY_BASE_FIELDS}
`;

export const ME = gql`
	query {
		me {
			...userBaseFields
		}
	}

	${USER_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
					id
					fullName
					description
					language
					ownerAvatarUrl
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					url
        }
    }
`;