import { Input } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 2rem;
`

const BoardHeader = styled.div`
  display: flex;
  padding: 1rem;
`

const StyledInput = styled(Input)`
  max-width: 30rem;
  margin-right: 2rem;
`

export {
  StyledInput,
  Wrapper,
  BoardHeader
}