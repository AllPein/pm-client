import { notification } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { CheckCircleIcon } from '@/components/Icons/CheckCircleIcon'
import { CloseCircleIcon } from '@/components/Icons/CloseCircleIcon'
import { LoadingIcon } from '@/components/Icons/LoadingIcon'
import { WarningIcon } from '@/components/Icons/WarningIcon'
import { Placement } from '@/enums/Placement'

// import './notification.css'

notification.config({
  placement: Placement.TOP_RIGHT
})

const SPINNER_DELAY = 300

export const notifyProgress = (message, delay = SPINNER_DELAY) => {
  const key = uuidv4()

  const timeout = setTimeout(
    () => {
      notification.open({
        key,
        icon: <LoadingIcon />,
        message,
        duration: 0
      })
    },
    delay
  )

  return () => {
    clearTimeout(timeout)
    notification.close(key)
  }
}

export const notifyRequest = (request) => async ({ fetching, success, warning }, delay = SPINNER_DELAY) => {
  const close = notifyProgress(fetching, delay)
  try {
    const result = await request
    close()
    success && notifySuccess(success)
    return result
  } catch (e) {
    close()
    warning && notifyWarning(warning)
    throw e
  }
}

export const notifySuccess = (message, description = '') =>
  notification.success({
    message,
    description
  })

export const notifyError = (message, description = '') => {
  return notification.error({
    message,
    description,
    icon: <CloseCircleIcon />
  })
}

export const notifyWarning = (message, description = '') => {
  return notification.warning({
    message,
    description,
    icon: <WarningIcon />
  })
}

export const notifyInfo = (message, description = '') => notification.info({
  message,
  description
})
