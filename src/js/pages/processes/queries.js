import { gql } from '@apollo/client';

export const PROCESS_LIST = gql`
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