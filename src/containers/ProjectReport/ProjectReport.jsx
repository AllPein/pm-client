import React, { useState } from 'react'
import * as UI from './ProjectReport.styles'
import { useDispatch } from 'react-redux'
import { Button, Upload } from 'antd'
import { useCallback } from 'react'
import { ENV } from '@/utils/env'
import { fileApi } from '@/api/fileApi'
import { updateProject } from '@/actions/projectView'
import { UploadOutlined } from '@ant-design/icons'

const ProjectReport = ({
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
      dispatch(updateProject({
        ...project,
        reportUrl: response.data.url
      }))
      onSuccess('OK')
    } catch (err) {
      onError({ err })
    }
  }

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
        fileList={files}
      >
        <Button icon={<UploadOutlined />}>Загрузить отчет</Button>
      </Upload>
    </UI.Wrapper>
  )
}

export {
  ProjectReport
}
