import { gql } from '@apollo/client';
import { REPOSITORY_BASE_FIELDS, USER_BASE_FIELDS, REVIEW_BASE_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
	query getRepositories(
		$orderDirection: OrderDirection
		$orderBy: AllRepositoriesOrderBy
		$searchKeyword: String
		$first: Int
		$after: String
		) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
			) {
			edges {
				node {
					...repositoryBaseFields
				}
    	}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
    	}
    }
  }

	${REPOSITORY_BASE_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      ...userBaseFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewBaseFields
          }
          cursor
        }
        pageInfo {
					endCursor
					startCursor
					hasNextPage
        }
      }
    }
  }

	${USER_BASE_FIELDS}
	${REVIEW_BASE_FIELDS}
`;

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!, $first: Int, $after: String) {
			repository(id: $id) {
				...repositoryBaseFields
			reviews(first: $first, after: $after) {
				totalCount
				edges {
					node {
						...reviewBaseFields
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
      	}
			}
		}
	}

	${REPOSITORY_BASE_FIELDS}
	${REVIEW_BASE_FIELDS}
`;