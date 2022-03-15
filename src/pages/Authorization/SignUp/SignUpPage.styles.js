import styled from 'styled-components/macro';

export const FormLogin = styled.div`
  min-width: 50rem;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0rem 0.3rem 0.1rem -0.2rem rgba(0, 0, 0, 0.2),
  0rem 0.2rem 0.2rem 0rem rgba(0, 0, 0, 0.14),
  0rem 0.1rem 0.5rem 0rem rgba(0, 0, 0, 0.12);
`

export const ButtonWrapper = styled.div`
  margin-top: 3rem;
`

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Name = styled.h2`
  margin: 1.2rem 0;
  font-size: 2rem;
  color: ${(props) => props.theme.color.primary1Dark}
`