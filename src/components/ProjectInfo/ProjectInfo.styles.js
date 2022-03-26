import { Input } from 'antd'
import styled from 'styled-components'

const { Group } = Input

const Wrapper = styled.div``

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NameControl = styled.div`
  display: flex;
  align-items: center;
`

const StyledAvatar = styled.div``

const Description = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  font-weight: 200;
  color: ${(props) => props.theme.color.primary4};
`

const DescriptionName = styled.p`
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`

const Name = styled.h1`
  margin: 1.2rem 5rem;
  font-size: 3.5rem;
  color: ${(props) => props.theme.color.primary2Light};
`

const InfoControls = styled.p`
  margin: 1.4rem 0rem;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.grayscale5};
`

const RepoName = styled.p`
  margin: 1.4rem 1rem;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.primary4};
`

const StyledInput = styled(Group)`
  margin: 1rem 2rem;
`

const RepoHandler = styled.div`
  display: flex;
  width: 50rem;
`

const RightControls = styled.div`
  margin-right: 5rem;
  max-width: 50rem;
`


export {
  RightControls,
  Controls,
  Wrapper,
  RepoHandler,
  StyledInput,
  Name,
  NameControl,
  InfoControls,
  RepoName,
  Description,
  DescriptionName,
  StyledAvatar
}
