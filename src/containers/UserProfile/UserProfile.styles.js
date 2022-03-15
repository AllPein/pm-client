import styled from 'styled-components'
import { Avatar, Button } from 'antd'
import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon'
import { CustomMenu } from '@/components/Menu/CustomMenu'

const StyledMenu = styled(CustomMenu)`
  padding: 0;
  color: ${(props) => props.theme.color.grayscale5};

  .ant-dropdown-menu-item {
    padding: 0;
  }
`

const StyledAvatar = styled(Avatar)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 3rem;
  border: 1px solid ${(props) => props.theme.color.grayscale1};
`

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  padding: 0;
  margin-left: 3.5rem;
  margin-right: 2.5rem;
  color: ${(props) => props.theme.color.grayscale3};
  border: none;
  box-shadow: none;
`

const FullNameBlock = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.5rem;
  font-weight: 400;
`

const ProfileMenuOption = styled.div`
  padding: 1rem;
  margin: 0;
  min-width: 16rem;
  &:hover {
    border-left: 2px solid ${(props) => props.theme.color.primary2};
    color: ${(props) => props.theme.color.grayscale5};
  }
`

const DownIcon = styled(ArrowDownIcon)`
  font-size: 1.1rem;
`

const UserHeadline = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  height: 3rem;
  padding: 0 1rem;
`

const Group = styled.div`
  line-height: 1.5rem;
  font-size: 1.2rem;
`

export {
  StyledMenu,
  StyledAvatar,
  StyledButton,
  DownIcon,
  FullNameBlock,
  UserHeadline,
  ProfileMenuOption,
  Group
}
