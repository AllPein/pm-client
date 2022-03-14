import PropTypes from 'prop-types'
import { Spin } from '@/components/Spin'
import { SPINNER } from '@/constants/automation'
import { StyledCenteredSpinWrapper } from './CenteredSpin.styles'

const CenteredSpin = ({ spinning = false }) => (
  <StyledCenteredSpinWrapper>
    <Spin
      data-automation={SPINNER}
      spinning={spinning}
    />
  </StyledCenteredSpinWrapper>
)

CenteredSpin.propTypes = {
  spinning: PropTypes.bool
}

export {
  CenteredSpin
}
