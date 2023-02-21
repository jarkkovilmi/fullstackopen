import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
			edges {
				node {
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					ownerAvatarUrl
					fullName
					description
					language
				}
    	}
    }
  }
`;