import { gql } from 'apollo-boost';

export const DEPARTMENTS = gql`
	query {
		departments {
			name
		}
	}
`;
