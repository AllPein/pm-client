import PropTypes from 'prop-types'
import { UserProfile } from '@/containers/UserProfile'
import { LogoIcon } from '@/components/Icons/LogoIcon'
import * as UI from './ApplicationHeader.styles'
import { goTo } from '@/utils/routerActions'

const ApplicationHeader = () => {
  const onLogoClick = () => {
    goTo('/')
  }
  return (
    <UI.Header>
      <UI.StyledLogoSearch onClick={onLogoClick} >
        <LogoIcon />
      </UI.StyledLogoSearch>
      <UI.StyledProfileUpload>
        <UserProfile />
      </UI.StyledProfileUpload>
    </UI.Header>
  )
}
ApplicationHeader.propTypes = {
  pathName: PropTypes.string
}


export {
  ApplicationHeader
}
