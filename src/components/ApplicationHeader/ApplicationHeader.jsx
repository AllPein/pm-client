import PropTypes from 'prop-types'
import { UserProfile } from '@/containers/UserProfile'
import { LogoIcon } from '@/components/Icons/LogoIcon'
import * as UI from './ApplicationHeader.styles'

const ApplicationHeader = () => (
  <UI.Header>
    <UI.StyledLogoSearch>
      <LogoIcon />
    </UI.StyledLogoSearch>
    <UI.StyledProfileUpload>
      <UserProfile />
    </UI.StyledProfileUpload>
  </UI.Header>
)

ApplicationHeader.propTypes = {
  pathName: PropTypes.string
}


export {
  ApplicationHeader
}
