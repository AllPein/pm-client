import React, { useMemo, useState, useEffect } from 'react'
import * as UI from './ProjectMetrics.styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectTime } from '@/actions/projectView'
import { projectTimeSelector } from '@/selectors/projectView'
import { MetricCard } from './MetricCard'
import { ENV } from '@/utils/env'

const ProjectMetrics = ({
  projectCode
}) => {
  const dispatch = useDispatch()
  const projectTime = useSelector(projectTimeSelector)

  useEffect(() => {
    dispatch(fetchProjectTime(projectCode))
  }, [dispatch, projectCode])

  return (
    <UI.Wrapper>
      {projectTime &&
        projectTime.map((par) => (
          <MetricCard 
            key={par.metrics.time}
            metric={par}
          />
        ))
      }
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
