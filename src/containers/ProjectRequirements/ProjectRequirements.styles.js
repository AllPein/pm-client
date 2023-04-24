import styled from 'styled-components'
import { Button } from 'antd';

const Wrapper = styled.div`
  max-height: 23.5rem;
`

const StyledButton = styled(Button)`
  margin-top: 1.4rem;
`

const InputWrapper = styled.div`
  display: flex;
  margin: 1rem 0;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
`



export {
  Wrapper,
  StyledButton,
  InputWrapper,
}
