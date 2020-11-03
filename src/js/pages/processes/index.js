/* lib */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useQuery,
	gql
} from '@apollo/client';
import moment from 'moment'
/* components */
import PageLayout from '../../components/pageLayouts/layout2'
import LoadingSpinner from '../../components/loadingSpinner'

/* other */
// import { urlBuilder } from '../../routes'
import {
} from '../../Redux/actionCreators'

/* styles */
import md from './styles.module.scss'

moment.locale('ru')

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
	// console.log('ProcessesPage')

	// const dispatch = useDispatch()
	// const tvsStore = useSelector(state => state.televisions)

	const { loading, error, data = null } = useQuery(PROCESS_LIST);

	const processList = data ? data.processList : null

	// console.log("processList", processList)
	if (processList) {
		const { averageLeadTime, averageActiveTime, start, end, loading, ...other } = processList[10]
		console.log("processList", processList[0])

		console.log("=========== Cреднее время выполнения", averageLeadTime)
		const f1 = moment.utc(Number(averageLeadTime)).format('HH:mm').split(":");
		console.log("f1:", `${f1[0]}ч ${f1[1]} мин`)

		console.log("=========== Cреднее активное время", averageActiveTime)
		const f2 = moment.utc(Number(averageActiveTime)).format('HH:mm').split(":");
		console.log("f2:", `${f2[0]}ч ${f2[1]} мин (${(averageActiveTime / averageLeadTime * 100).toFixed(1)}%)`)

		console.log("=========== Начало", start, end, loading)
		console.log(start / 1000 / 60 / 60 / 24)
		console.log(end / 1000 / 60 / 60 / 24)
		console.log(loading / 1000 / 60 / 60 / 24)
		// const f3 = moment(start, "x").format('DD MMMM YYYY');
		const f3 = moment.unix(Number(start) / 1000).format("DD MMMM YYYY");
		console.log("f3:", f3)
		// console.log("f3:", `${f3[0]}ч ${f3[1]} мин`)
	}

	return (
		<PageLayout>
			Processes PAGE
		</PageLayout>
	)
}

export default ProcessesPage