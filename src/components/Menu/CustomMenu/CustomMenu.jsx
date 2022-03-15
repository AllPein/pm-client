import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import stylePropType from 'react-style-proptype'
import { Dropdown } from '@/components/Dropdown'
import { MenuTrigger } from '../Menu'
import { StyledMenu } from './CustomMenu.styles'

const menuItemShape = PropTypes.shape({
  content: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  style: stylePropType,
  disabled: PropTypes.bool
})

class CustomMenu extends PureComponent {
  static propTypes = {
    arrow: PropTypes.bool,
    className: PropTypes.string,
    getPopupContainer: PropTypes.func,
    disabled: PropTypes.bool,
    trigger: PropTypes.string,
    items: PropTypes.arrayOf(menuItemShape).isRequired,
    children: PropTypes.element.isRequired
  }

  state = {
    visible: false
  }

  handleClick = () => {
    this.setState({
      visible: false
    })
  }

  onVisibleChange = (visible) => {
    this.setState({
      visible
    })
  }

  renderItems = () => this.props.items.map(
    (item, index) => (
      <StyledMenu.Item
        key={index}
        disabled={item.disabled}
        onClick={item.onClick ?? this.handleClick}
        style={item.style}
      >
        {item.content()}
      </StyledMenu.Item>
    ))

  renderMenu = () => (
    <StyledMenu className={this.props.className}>
      {this.renderItems()}
    </StyledMenu>
  )

  getPopupContainer = (trigger) => trigger

  render = () => (
    <Dropdown
      arrow={this.props.arrow}
      disabled={this.props.disabled}
      getPopupContainer={this.props.getPopupContainer || this.getPopupContainer}
      onVisibleChange={this.onVisibleChange}
      overlay={this.renderMenu()}
      trigger={
        [
          this.props.trigger || MenuTrigger.CLICK
        ]
      }
      visible={this.state.visible}
    >
      {this.props.children}
    </Dropdown>
  )
}

export {
  CustomMenu
}
