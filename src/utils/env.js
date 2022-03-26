const getEnvValue = (name) => (
  window._env_?.[name] ?? process.env[name]
)

const ENV = {
  BACKEND_URL: getEnvValue('REACT_APP_BACKEND_URL'),
  CLOUD_NAME: getEnvValue('REACT_APP_CLOUD_NAME'),
  UPLOAD_PRESET: getEnvValue('REACT_APP_UPLOAD_PREST')
}

export {
  ENV
}
