import React, { useState, useEffect, useMemo } from 'react'
import * as UI from './ProjectReport.styles'
import { useDispatch } from 'react-redux'
import { Button, Upload } from 'antd'
import { useCallback } from 'react'
import { ENV } from '@/utils/env'
import { fileApi } from '@/api/fileApi'
import { updateProject } from '@/actions/projectView'
import { UploadOutlined } from '@ant-design/icons'
import { notifySuccess } from '@/utils/notification/notification'
import { UserRoles } from '@/enums/Role'

const ProjectReport = ({
  user,
  project
}) => {
  const [files, setFiles] = useState([])
  const dispatch = useDispatch()

  const uploadImage = async (options) => {
    const { onError, file, onSuccess } = options
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', ENV.UPLOAD_PRESET)
    try {
      const response = await fileApi.uploadFile(data, 'raw')
      await dispatch(updateProject({
        id: project.id,
        code: project.code,
        reportUrl: response.data.url,
        reportName: file.name
      }))
      notifySuccess('Успешно', 'Отчет загружен')
      onSuccess('OK')
    } catch (err) {
      onError({ err })
    }
  }

  const onFileRemove = useCallback(async (info) => {
    await dispatch(updateProject({
      id: project.id,
      code: project.code,
      reportUrl: '',
      reportName: ''
    }))
    notifySuccess('Упешно', 'Отчет удален')
  }, [dispatch, project.code, project.id])

  useEffect(() => {
    if (project.reportUrl) {
      setFiles([{
        uid: '1',
        name: project.reportName,
        status: 'done',
        url: project.reportUrl
      }])
    }
  }, [project.reportUrl, project.reportName])

  const btnDisabled = useMemo(() => {
    return (
      user.role === UserRoles.ADMIN ||
      !project.participants.find((p) => p.userId === user.id)
    )
  }, [project.participants, user.id, user.role])

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

  return (
    <UI.Wrapper>
      <UI.FieldName>
        Отчет по проекту
      </UI.FieldName>
      <Upload
        customRequest={uploadImage}
        onChange={onFileChange}
        onRemove={onFileRemove}
        fileList={files}
      >
        <Button
          icon={<UploadOutlined />}
          disabled={btnDisabled}
        >
          Загрузить отчет
        </Button>
      </Upload>
    </UI.Wrapper>
  )
}

export {
  ProjectReport
}
