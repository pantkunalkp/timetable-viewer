import { gql } from 'apollo-boost';

export const NEWFACULTY = gql`
	mutation NewFaculty($name: String!, $department: String!) {
		newFaculty(name: $name, department: $department) {
			name
		}
	}
`;
