import { Avatar } from 'antd'
import styled from 'styled-components'

const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.color};
  cursor: pointer;
  outline: ${(props) => props.active ? '0.15rem solid #1890ff' : 'none'};
`

export {
  StyledAvatar
}