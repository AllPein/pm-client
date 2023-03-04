import React, { useEffect } from 'react'
import * as UI from './ProjectMetrics.styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectTime } from '@/actions/projectView'
import { projectTimeSelector } from '@/selectors/projectView'
import { MetricCard } from './MetricCard'
import { isFetchingSelector } from '@/selectors/requests'
import { Spin } from '@/components/Spin'
import { downloadReport } from '../../actions/projectView/projectView'

const ProjectMetrics = ({
  project
}) => {
  const dispatch = useDispatch()
  const projectTime = useSelector(projectTimeSelector)
  const isFetching = useSelector(isFetchingSelector(fetchProjectTime))

  useEffect(() => {
    dispatch(fetchProjectTime(project.id))
  }, [dispatch, project]);

  const handleDownload = () => {
    dispatch(downloadReport(project.id));
  }

  return (
    <UI.Wrapper>
      {isFetching && (
        <Spin spinning />
      )}
      {projectTime ? (
        <>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={`${project.repo}/commits`}
        >
          История коммитов
        </a>
        {
          projectTime.map((par) => (
            <MetricCard 
              key={par.metrics.time}
              metric={par}
            />
          ))
        }
        <a
          onClick={handleDownload}
        >
          Скачать отчет
        </a>
          </>
        ) : (
          <p>Привяжите репозиторий</p>
        )
      }
    </UI.Wrapper>
  )
}

export {
  ProjectMetrics
}
