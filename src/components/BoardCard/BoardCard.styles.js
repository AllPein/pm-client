import { Avatar } from 'antd'
import styled from 'styled-components'

const CardWrapper = styled.div`
  background-color: #fff;
  width: 20rem;
  border-radius: 0.4rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 1.3rem;
  margin-bottom: 1rem;
  
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.color};
`

const TaskName = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.color.primary4};
`

const TaskDate = styled.h2`
  margin-top: 1rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: #707070;
`

const TaskCode = styled.p`
  color:#505f79;
  font-weight: 400;
  font-size: 1.4rem;
`

const BottomControls = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EstimatedTimeTooltip = styled.div`
  background-color: #dfe1e6;
  color: #172b4d;
  font-size: 1.2rem;
  border-radius: 2em;
  font-weight: 600;
  line-height: 1.6rem;
  height: 1.6rem;
  max-height: 1.6rem;
  padding: 0 0.7rem;
`

export {
  TaskName,
  BottomControls,
  TaskDate,
  TaskCode,
  StyledAvatar,
  EstimatedTimeTooltip,
  CardWrapper
}