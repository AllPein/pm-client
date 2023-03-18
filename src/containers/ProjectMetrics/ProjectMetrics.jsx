import React, { useEffect, useCallback, useState  } from 'react'
import * as UI from './ProjectMetrics.styles'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectTime } from '@/actions/projectView'
import { projectTimeSelector } from '@/selectors/projectView'
import { MetricCard } from './MetricCard'
import { isFetchingSelector } from '@/selectors/requests'
import { Spin } from '@/components/Spin'
import { downloadReport } from '../../actions/projectView/projectView'
import { Button, Modal, Tabs } from 'antd'
import { useMemo } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectMetrics = ({
  project
}) => {
  const dispatch = useDispatch()
  const projectTime = useSelector(projectTimeSelector)
  const isFetching = useSelector(isFetchingSelector(fetchProjectTime))

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchProjectTime(project.id))
  }, [dispatch, project]);

  const handleDownload = () => {
    dispatch(downloadReport(project.id));
  }

  const toggleModal = useCallback(
    (state) => {
      setIsModalVisible(state);
    },
    [setIsModalVisible]
  );

  const getPieChartData = useCallback((key, label) => {
    if (projectTime) {
      return {
        labels: projectTime.map((metric) => metric.user.firstName + " " + metric.user.lastName),
        datasets: [{
          label,
          data: projectTime.map((metric) => metric.metrics[key]),
          backgroundColor: projectTime.map((metric) => metric.user.avatarColor),
        }]
      } 
    }
  }, [projectTime]);

  const tabs = useMemo(() => [
    {
      key: '1',
      label: `Коммиты`,
      children: (
        <>
          <Pie
            style={{ maxHeight: 400 }}
            data={getPieChartData('count', 'Коммитов')} />
        </>
      ),
    },
    {
      key: '2',
      label: `Добавления`,
      children: (
        <>
          <Pie
            style={{ maxHeight: 400 }}
            data={getPieChartData('numberOfAdditions', 'Добавлено')} />
        </>
      ),
    },
    {
      key: '3',
      label: `Задачи`,
      children: (
        <>
          <Pie
            fallbackContent={<p>afaf</p>}
            style={{ maxHeight: 400 }}
            data={getPieChartData('tasksDoneCount', 'Задач')} />
        </>
      )
    },
    {
      key: '4',
      label: `Время на задачи`,
      children: (
        <>
          <Pie
            style={{ maxHeight: 400 }}
            data={getPieChartData('tasksEstimateCount', 'Время')} />
        </>
      )
    },
  ], [getPieChartData])

  const renderModalContent = useMemo(() => {
    return (
      <UI.ModalWrapper>
        <Tabs defaultActiveKey="1" items={tabs} />
      </UI.ModalWrapper>
    )
  }, [tabs]);

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
        <Button type='primary' onClick={() => toggleModal(true)}>Визуализировать</Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a onClick={handleDownload} style={{ marginLeft: '5rem' }}>
          Скачать отчет
        </a>
          </>
        ) : (
          <p>Привяжите репозиторий</p>
        )
      }
      <Modal
        open={isModalVisible}
        width="100rem"
        title="Работа студентов"
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
      >
        {renderModalContent}
      </Modal>
    </UI.Wrapper>
  )
}

export {
  ProjectMetrics
}
