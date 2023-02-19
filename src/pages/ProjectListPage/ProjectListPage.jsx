import React, { useMemo, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@/containers/Search'
import * as UI from './ProjectListPage.styles'
import { ProjectList } from '@/containers/ProjectList'
import { Button, DatePicker, Input, Modal, Pagination, Upload } from 'antd'
import { searchSelector, pageSelector } from '@/selectors/navigation'
import { changeFilters } from '@/actions/navigation'
import { FilterKeys } from '@/constants/filters'
import { projectsSelector } from '@/selectors/projects'
import { Empty } from '@/components/Empty'
import locale from 'antd/es/date-picker/locale/ru_RU'
import 'moment/locale/ru'
import { UploadOutlined } from '@ant-design/icons'
import { fetchProjects } from '@/actions/projects'
import { userInfoSelector } from '@/selectors/user'
import { UserRoles } from '@/enums/Role'
import { fileApi } from '@/api/fileApi'
import { ENV } from '@/utils/env'
import { createProject } from '@/actions/projects/projects'

const ProjectListPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [files, setFiles] = useState([])
  const [fileUrl, setFileUrl] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectDate, setProjectDate] = useState(new Date())

  const dispatch = useDispatch()

  const projects = useSelector(projectsSelector)
  const searchValue = useSelector(searchSelector)
  const currentPage = useSelector(pageSelector)
  const user = useSelector(userInfoSelector)

  // useEffect(() => {
  //   dispatch(fetchProjects())
  // }, [dispatch])

  const setPage = useCallback((page) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    dispatch(
      changeFilters({
        [FilterKeys.PAGE]: page 
      })
    )
  }, [dispatch])

  const toggleModal = useCallback((state) => {
    setIsModalVisible(state)
  }, [setIsModalVisible])


  const paginationConfig = useMemo(() => {
    const total = projects.length
    return {
      pageSize: 10,
      current: currentPage,
      onChange: setPage,
      total: total,
      hideOnSinglePage: true,
      showSizeChanger: false
    }
  }, [currentPage, projects, setPage])

  const filteredProjects = useMemo(() => {
    if (!searchValue.length) {
      const startIndex = Math.max(currentPage - 1, 0) * 10
      const endIndex = Math.min(startIndex + 10, projects.length) 
      return projects.slice(startIndex, endIndex)
    }
  
    return projects.filter((p) => 
      (
        p.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        p.description.toLowerCase().includes(searchValue.toLowerCase())
      )  
    )
  }, [searchValue, projects, currentPage])

  const renderProjects = useMemo(() => {
      if (filteredProjects.length) {
        return (
          <>
            <ProjectList projects={filteredProjects} />
            <Pagination {...paginationConfig} />
          </>
        )
      }

      return (
        <Empty 
          style={{
            marginTop: '6rem'
          }}
          description={
            <span>
              Проектов нет :(
            </span>
          } 
        />
    )
  }, [filteredProjects, paginationConfig])

  const onFileChange = useCallback((info) => {
    const fileList = [...info.fileList].slice(-1)
    const files = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url
      }
      return file;
    })
    setFiles(files)
  }, [])

  const addProject = useCallback(async () => {
    await dispatch(createProject({
      name: projectName,
      description: projectDescription,
      dueDate: projectDate,
      avatar: fileUrl
    }))
    await dispatch(fetchProjects())
    toggleModal(false)
  }, [dispatch, projectName, projectDescription, projectDate, fileUrl, toggleModal])

  const uploadImage = async (options) => {
    const { onError, file, onSuccess } = options
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', ENV.UPLOAD_PRESET)
    try {
      const response = await fileApi.uploadFile(data, 'image')
      setFileUrl(response.data.url)
      onSuccess('OK')
    } catch (err) {
      onError({ err })
    }
  }

  const onChangeName = (e) => {
    setProjectName(e.target.value)
  }
  
  const onChangeDescription = (e) => {
    setProjectDescription(e.target.value)
  }

  const onChangeDate = (date, dateString) => {
    setProjectDate(new Date(dateString).toISOString())
  }

  const renderModalContent = useMemo(() => (
    <>
      <UI.FieldName>
        Название
      </UI.FieldName>
      <Input
        value={projectName}
        onChange={onChangeName}
        placeholder='Заполните поле'
      />
      <UI.FieldName>
        Описание
      </UI.FieldName>
      <Input.TextArea
        value={projectDescription}
        onChange={onChangeDescription}
        placeholder='Заполните поле'
      />
      <UI.FieldName>
        Дата сдачи
      </UI.FieldName>
      <DatePicker
        onChange={onChangeDate}
        locale={locale}
      />
      <UI.FieldName>
        Аватар
      </UI.FieldName>
      <Upload
        customRequest={uploadImage}
        onChange={onFileChange}
        fileList={files}
      >
        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
      </Upload>
    </>
  ), [files, onFileChange, projectDescription, projectName])


  return (
    <>
      <UI.Wrapper>
        <UI.Controls>
          <Search />
          {
            user.role === UserRoles.PROJECT_MANAGER && 
            (
              <Button
                type='primary'
                onClick={() => toggleModal(true)}
              >
                Создать проект
              </Button>
            )
          }
        </UI.Controls>
        {renderProjects}
      </UI.Wrapper>
      <Modal
        open={isModalVisible}
        title='Создание проекта'
        onOk={addProject}
        onCancel={() => toggleModal(false)}
      >
        {renderModalContent}
      </Modal>
    </>
  )
}

export {
  ProjectListPage
}
