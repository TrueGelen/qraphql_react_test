/* lib */
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
/* img */
import chevrone_right_png from '../../../../img/processCard/chevrone_right.png'
import clock_png from '../../../../img/processCard/clock.png'
import load_png from '../../../../img/processCard/load.png'
import timer_png from '../../../../img/processCard/timer.png'
import tree_png from '../../../../img/processCard/tree.png'
import users_png from '../../../../img/processCard/users.png'
/* styles */
import md from './LineCard.module.scss'

function LineCard({
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
      {/* {console.log(`=======LineCard=======`)} */}
      <div className={md.header}>
        <h3 className={md.header__title}>{name}</h3>
        {
          link ?
            <Link className={md.header__link} to={link}>
              <p>На карту процесса</p>
              <img src={chevrone_right_png} />
            </Link>
            :
            <a className={`${md.header__link} ${md.header__link_disabled}`}>
              <p>На карту процесса</p>
              <img src={chevrone_right_png} />
            </a>
        }
      </div>
      <div className={md.body}>
        <div className={md.body__item}>
          <div className={md.dataCell}>
            <img className={md.dataCell__icon}
              src={load_png} />
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
              src={clock_png} />
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
              src={timer_png} />
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
              src={tree_png} />
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
              src={users_png} />
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

export default memo(LineCard)

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