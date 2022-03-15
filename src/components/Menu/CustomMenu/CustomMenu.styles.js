import styled from 'styled-components'
import { Menu } from '../Menu'

const StyledMenu = styled(Menu)`
  .ant-dropdown-menu-item {
    padding: 0;
    & > a {
      margin: 0;
    }
    &:hover {
      cursor: pointer;
    } 
    &[aria-disabled='true']:hover {
      cursor: not-allowed;
    }
  }
`

StyledMenu.Item = Menu.Item

export {
  StyledMenu
}
