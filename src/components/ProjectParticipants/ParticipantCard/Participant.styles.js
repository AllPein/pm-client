import { Avatar } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0;
`

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-left: 2rem;
`
const Text = styled.p`
  font-size: 1.6rem;
  font-weight: 200;
  margin: 1rem 4rem;
  color: ${(props) => props.theme.color.primary4};
  min-width: 20rem;
`

const FullNameBlock = styled.div`
  display: flex;
  align-items: center;
  font-weight: 200;
  font-size: 1.6rem;
  line-height: 1.5rem;
  min-width: 20rem;
`

const StyledAvatar = styled(Avatar)`
  display: flex;
  height: 5rem;
  min-width: 5rem;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1.6rem;
  margin-top: 0.6rem;
  line-height: 3rem;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.theme.color.grayscale1};
`

export {
  StyledAvatar,
  FullNameBlock,
  InfoWrapper,
  Text,
  Wrapper
}
