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

const FieldName = styled.h2`
  margin: 1.2rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`;

export {
  Wrapper,
  StyledButton,
  InputWrapper,
  FieldName
}
