import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
	query getRepositories(
		$orderDirection: OrderDirection
		$orderBy: AllRepositoriesOrderBy
		) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			) {
			edges {
				node {
					...repositoryBaseFields
				}
    	}
    }
  }

	${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
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
				...repositoryBaseFields
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
		}
	}

	${REPOSITORY_BASE_FIELDS}
`;