/* lib */
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
/* other */
import { baseUrl } from '../../../Redux/constants'
/* styles */
import md from './LineCard.module.scss'

export default function LineCard({
  className,
  onClick,
  data,
  link,
  ...props }) {

  const {
    averageLeadTime,
    averageActiveTime,
    start,
    end,
    loading,
    numberOfExecutions,
    numberOfScenarios,
    name,
    employeesInvolvedProcess
  } = data

  return (
    <div className={`${md.card} ${className}`}>
      <div className={md.header}>
        <h3 className={md.header__title}>{name}</h3>
        {
          link ?
            <Link className={md.header__link} to={link}>
              <p>На карту процесса</p>
              <img src={`${baseUrl}assets/imgs/processCard/chevrone_right.png`} />
            </Link>
            :
            <a className={`${md.header__link} ${md.header__link_disabled}`}>
              <p>На карту процесса</p>
              <img src={`${baseUrl}assets/imgs/processCard/chevrone_right.png`} />
            </a>
        }
      </div>
      <div className={md.body}>
        <div className={md.body__item}>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={`${baseUrl}assets/imgs/processCard/load.png`} />
            <div className={md.dataCell__data}>
              <p className={`${md.dataCell__title} ${md.dataCell__title_numberOfExecutions}`}>
                {numberOfExecutions}
              </p>
              <p className={`${md.dataCell__label}`}>
                выполнено раз
            </p>
            </div>
          </div>
        </div>
        <div className={md.body__item}>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={`${baseUrl}assets/imgs/processCard/clock.png`} />
            <div className={md.dataCell__data}>
              <p className={md.dataCell__title}>
                {averageLeadTime}
              </p>
              <p className={`${md.dataCell__label}`}>
                среднее время выполнения
              </p>
            </div>
          </div>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={`${baseUrl}assets/imgs/processCard/timer.png`} />
            <div className={md.dataCell__data}>
              <p className={md.dataCell__title}>
                {averageActiveTime}
              </p>
              <p className={`${md.dataCell__label}`}>
                среднее активное время
              </p>
            </div>
          </div>
        </div>
        <div className={md.body__item}>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={`${baseUrl}assets/imgs/processCard/users.png`} />
            <div className={md.dataCell__data}>
              <p className={md.dataCell__title}>
                {employeesInvolvedProcess}
              </p>
              <p className={`${md.dataCell__label}`}>
                участвуют в процессе
              </p>
            </div>
          </div>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={`${baseUrl}assets/imgs/processCard/tree.png`} />
            <div className={md.dataCell__data}>
              <p className={md.dataCell__title}>
                {numberOfScenarios}
              </p>
              <p className={`${md.dataCell__label}`}>
                в процессе
              </p>
            </div>
          </div>
        </div>
        <div className={md.body__item}>
          <div className={md.dateLine}>
            <p className={md.dateLine__title}>Начало</p>
            <p className={md.dateLine__date}>{start}</p>
          </div>
          <div className={md.dateLine}>
            <p className={md.dateLine__title}>Окончание</p>
            <p className={md.dateLine__date}>{end}</p>
          </div>
          <div className={md.dateLine}>
            <p className={md.dateLine__title}>Загрузка</p>
            <p className={md.dateLine__date}>{loading}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

LineCard.defaultProps = {
  className: undefined,
  onClick: () => { },
  data: {},
  link: null
}

LineCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.object,
  link: PropTypes.string
}