/* lib */
import React, { useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'

/* components */

/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
// import moduleStyles from './styles.module.scss'

const GET_USER_BY_ID = gql`
  query($id: Int!){
    userById(id: $id){
      id,
      firstName,
      secondName,
      email
    }
  }
`;

function LKPage(props) {
  console.log('LKPage')
  let id = 1;

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{console.log(error)}Error :(</p>;

  console.log(data)

  return (
    <div>

      LK PAGE

    </div>
  )
}

export default LKPage