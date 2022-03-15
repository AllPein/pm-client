import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 2rem;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-radius: 1rem;
  box-shadow: 0rem 0.3rem 0.1rem -0.2rem rgba(0, 0, 0, 0.2),
  0rem 0.2rem 0.2rem 0rem rgba(0, 0, 0, 0.14),
  0rem 0.1rem 0.5rem 0rem rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0 0.6rem 1rem 0 rgba(0, 0, 0, 0.12),
    0 0.1rem 1.8rem 0 rgba(0, 0, 0, 0.12),
    0 0.3rem 0.5rem -0.1rem rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
`

const ProjectInfo = styled.div`
  padding-left: 5rem;
`

const Description = styled.p`
  margin: 1.2rem 0;
  color: ${(props) => props.theme.color.primary1};
`

const Name = styled.h2`
  margin: 1.2rem 0;
  font-size: 2rem;
  color: ${(props) => props.theme.color.primary2Darker};
`

const Footer = styled.div`
  display: flex;
  width: 25rem;
  justify-content: space-between;
`

const FooterInfo = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.color.grayscale5};
`

const StyledAvatar = styled.div``

export {
  Name,
  ProjectInfo,
  StyledAvatar,
  Footer,
  FooterInfo,
  Description,
  Wrapper
}
