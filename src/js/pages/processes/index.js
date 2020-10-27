/* lib */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/* components */
import PageLayout from '../../components/pageLayouts/layout2'

/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
import moduleStyles from './styles.module.scss'


function ProcessesPage(props) {
  console.log('ProcessesPage')

  // const dispatch = useDispatch()
  // const tvsStore = useSelector(state => state.televisions)

  useEffect(() => {
  }, [])


  return (
    <PageLayout>Processes PAGE</PageLayout>
  )
}

export default ProcessesPage