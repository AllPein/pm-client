import { Avatar, Button } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 5rem;
`

const StyledAvatar = styled(Avatar)`
  display: flex;
  height: 6rem;
  min-width: 6rem;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  margin-top: 0.6rem;
  line-height: 3rem;
  background-color: ${(props) => props.color};
  border: 0.1rem solid ${(props) => props.theme.color.grayscale1};
`

const StyledButton = styled(Button)`
`

const StyledButtonBack = styled(Button)`
  margin: 0 2rem;
`

const FieldName = styled.h2`
  margin: 1.6rem 0;
  font-size: 2rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`
const ButtonControls = styled.div`
  margin-top: 3rem;
  display: flex;
`

export {
  Wrapper,
  FieldName,
  ButtonControls,
  StyledButtonBack,
  StyledButton,
  StyledAvatar
}
