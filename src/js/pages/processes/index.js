/* lib */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useQuery,
  gql
} from '@apollo/client';
/* components */
import PageLayout from '../../components/pageLayouts/layout2'
import LoadingSpinner from '../../components/loadingSpinner'

/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
import md from './styles.module.scss'

const PROCESS_LIST = gql`
  query{
    processList{
      id,
      name,
      numberOfExecutions,
      averageLeadTime,
      averageActiveTime,
      employeesInvolvedProcess,
      numberOfScenarios,
      start,
      end,
      loading
    }
  }
`;


function ProcessesPage(props) {
  console.log('ProcessesPage')

  // const dispatch = useDispatch()
  // const tvsStore = useSelector(state => state.televisions)

  const { loading, error, data = null } = useQuery(PROCESS_LIST);

  console.log(data)

  return (
    <PageLayout>
      Processes PAGE
    </PageLayout>
  )
}

export default ProcessesPage