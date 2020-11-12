/* libs */
import React from 'react'
import {
  useQuery,
  gql
} from '@apollo/client';
import moment from 'moment'
/* components */
import PageLayout from '../../components/pageLayouts/layout2'
import LoadingSpinner from '../../components/loadingSpinner'
import LineCard from '../../components/cards/lineCard'
import AError from '../../components/errors/error'
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
  const { loading, error, data = null } = useQuery(PROCESS_LIST);

  if (error) {
    return <PageLayout className={md.layout}>
      <AError text="Не удалось получить данные, попробуйте снова..." />
    </PageLayout>
  }

  const processList = data ? data.processList : null
  let cards = null

  if (processList) {

    cards = processList.map(proc => {
      let {
        id,
        averageLeadTime,
        averageActiveTime,
        start,
        end,
        loading,
        numberOfExecutions,
        numberOfScenarios,
        name,
        employeesInvolvedProcess
      } = proc
      let dataToCard = {}

      const f1 = moment.utc(Number(averageLeadTime)).format('HH:mm').split(":");
      const f2 = moment.utc(Number(averageActiveTime)).format('HH:mm').split(":");
      averageActiveTime = `${f2[0]}ч ${f2[1]} мин (${(averageActiveTime / averageLeadTime * 100).toFixed(1)}%)`
      averageLeadTime = `${f1[0]}ч ${f1[1]} мин`

      start = moment.unix(Number(start)).format("DD MMMM YYYY");
      end = moment.unix(Number(end)).format("DD MMMM YYYY");
      loading = moment.unix(Number(loading)).format("DD MMMM YYYY");
      numberOfExecutions = numberOfExecutions.toLocaleString('ru')

      const f7 = numberOfScenarios.toLocaleString('ru')
      numberOfScenarios = `${f7} сценариев`
      const f9 = employeesInvolvedProcess.toLocaleString('ru')
      employeesInvolvedProcess = `${f9} сотрудников`

      dataToCard = {
        averageLeadTime,
        averageActiveTime,
        start, end, loading,
        numberOfExecutions,
        numberOfScenarios,
        name,
        employeesInvolvedProcess
      }

      return <LineCard key={id} data={dataToCard} />
    })
  }

  return (
    <PageLayout className={md.layout}>
      {
        loading ?
          <LoadingSpinner />
          :
          cards ? cards : "Пока ничего..."
      }
    </PageLayout>
  )
}

export default ProcessesPage
















/* let {
  averageLeadTime,
  averageActiveTime,
  start,
  end,
  loading,
  numberOfExecutions,
  numberOfScenarios,
  name,
  employeesInvolvedProcess
} = processList[0]
console.log("processList", processList[0])

console.log("=========== среднее время выполнения", averageLeadTime)
const f1 = moment.utc(Number(averageLeadTime)).format('HH:mm').split(":");
console.log("f1:", averageLeadTime)
console.log("=========== среднее активное время", averageActiveTime)
const f2 = moment.utc(Number(averageActiveTime)).format('HH:mm').split(":");
averageActiveTime = `${f2[0]}ч ${f2[1]} мин (${(averageActiveTime / averageLeadTime * 100).toFixed(1)}%)`
averageLeadTime = `${f1[0]}ч ${f1[1]} мин` // Относится к "=========== среднее время выполнения"
console.log("f2:", averageActiveTime)

console.log("=========== Начало", start)
const f3 = moment.unix(Number(start)).format("DD MMMM YYYY");
start = f3
console.log("f3:", start)

console.log("=========== Окончание", end)
const f4 = moment.unix(Number(end)).format("DD MMMM YYYY");
end = f4
console.log("f4:", end)

console.log("=========== Загрузка", loading)
const f5 = moment.unix(Number(loading)).format("DD MMMM YYYY");
loading = f5
console.log("f5:", loading)

console.log("=========== выполнено раз", numberOfExecutions)
const f6 = numberOfExecutions.toLocaleString('ru')
numberOfExecutions = f6
console.log("f6:", numberOfExecutions)

console.log("=========== в процессе", numberOfScenarios)
const f7 = numberOfScenarios.toLocaleString('ru')
numberOfScenarios = `${f7} сценариев`
console.log("f7:", numberOfScenarios)

console.log("=========== title", name)
const f8 = name
console.log("f8:", name)

console.log("=========== участвует в процессе", employeesInvolvedProcess)
const f9 = employeesInvolvedProcess.toLocaleString('ru')
employeesInvolvedProcess = `${f9} сотрудников`
console.log("f9:", employeesInvolvedProcess)

dataToCard = {
  averageLeadTime,
  averageActiveTime,
  start, end, loading,
  numberOfExecutions,
  numberOfScenarios,
  name,
  employeesInvolvedProcess
} */