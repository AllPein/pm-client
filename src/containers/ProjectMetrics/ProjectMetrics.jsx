import React, { useMemo, useState, useEffect } from 'react'
import * as UI from './ProjectMetrics.styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectTime } from '@/actions/projectView'
import { projectTimeSelector } from '@/selectors/projectView'
import { MetricCard } from './MetricCard'
import { ENV } from '@/utils/env'
import { isFetchingSelector } from '@/selectors/requests'
import { Spin } from '@/components/Spin'

const ProjectMetrics = ({
  projectCode
}) => {
  const dispatch = useDispatch()
  const projectTime = useSelector(projectTimeSelector)
  const isFetching = useSelector(isFetchingSelector(fetchProjectTime))

  useEffect(() => {
    dispatch(fetchProjectTime(projectCode))
  }, [dispatch, projectCode])

  return (
    <UI.Wrapper>
      {isFetching && (
        <Spin spinning />
      )}
      {projectTime &&
        projectTime.map((par) => (
          <MetricCard 
            key={par.metrics.time}
            metric={par}
          />
        ))
      }
      {!projectTime && 'Привяжите репозиторий'}<br></br>
      <a
        download
        href={`${ENV.BACKEND_URL}/projects/${projectCode}/report`}
      >
        Скачать отчет
      </a>
    </UI.Wrapper>
  )
}

export {
  ProjectMetrics
}
