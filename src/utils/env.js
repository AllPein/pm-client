const getEnvValue = (name) => (
  window._env_?.[name] ?? process.env[name]
)

const ENV = {
  BACKEND_URL: getEnvValue('REACT_APP_BACKEND_URL')
}

export {
  ENV
}
