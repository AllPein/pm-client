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
import { PieChart } from 'react-minimal-pie-chart'


const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

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

  const getPieChartData = useCallback((key) => {
    if (projectTime) {
      return projectTime.map((metric) => ({
        title: metric.user.firstName + " " + metric.user.lastName,
        value: metric.metrics[key],
        color: metric.user.avatarColor
      }))
    }
  }, [projectTime]);

  const tabs = useMemo(() => {
    const defaultProps = {
      style: { height: '40rem', marginTop: '2rem' },
      label: ({ dataEntry }) => Number(dataEntry.value) > 0 ? dataEntry.title : '',
      labelStyle: {
        ...defaultLabelStyle,
      }
    }
    
    return [
      {
        key: '1',
        label: `Коммиты`,
        children: (
          <>
            <PieChart
              data={getPieChartData('count')}
              {...defaultProps}
              />
          </>
        ),
      },
      {
        key: '2',
        label: `Задачи`,
        children: (
          <>
            <PieChart
              {...defaultProps}
              data={getPieChartData('tasksDoneCount')} />
          </>
        )
      },
      {
        key: '3',
        label: `Время на задачи`,
        children: (
          <>
            <PieChart
              {...defaultProps}
              data={getPieChartData('tasksEstimateCount')} />
          </>
        )
      },
    ]
  }, [getPieChartData])

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
