import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query($id: Int!){
    userById(id: $id){
      id,
      firstName,
      secondName,
      email
    }
  }
`;

export const EDIT_USER = gql`
	mutation($id: Int!, $firstName: String!, $secondName: String!, $email: String!, $password: String!){
		editUser(id: $id, firstName:$firstName, secondName: $secondName, email: $email, password:$password){
      id
    }
	}
`;