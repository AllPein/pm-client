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

const ProjectListPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [files, setFiles] = useState([])

  const dispatch = useDispatch()

  const projects = useSelector(projectsSelector)
  const searchValue = useSelector(searchSelector)
  const currentPage = useSelector(pageSelector)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

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
              Ничего не найдено :(
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

  const renderModalContent = useMemo(() => (
    <>
      <UI.FieldName>
        Название
      </UI.FieldName>
      <Input
      />
      <UI.FieldName>
        Описание
      </UI.FieldName>
      <Input.TextArea
      />
      <UI.FieldName>
        Дата сдачи
      </UI.FieldName>
      <DatePicker
        locale={locale}
      />
      <UI.FieldName>
        Аватар
      </UI.FieldName>
      <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        onChange={onFileChange}
        fileList={files}
        multiple
      >
        <Button icon={<UploadOutlined />}>Загрузить фото</Button>
      </Upload>
    </>
  ), [files, onFileChange])

  const toggleModal = useCallback((state) => {
    setIsModalVisible(state)
  }, [setIsModalVisible])

  return (
    <>
      <UI.Wrapper>
        <UI.Controls>
          <Search />
          <Button
            type='primary'
            onClick={() => toggleModal(true)}
          >
            Создать проект
          </Button>
        </UI.Controls>
        {renderProjects}
      </UI.Wrapper>
      <Modal
        visible={isModalVisible}
        title='Создание проекта'
        onOk={() => toggleModal(false)}
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
