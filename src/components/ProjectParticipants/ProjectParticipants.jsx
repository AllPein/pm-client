import React from 'react'
import PropTypes from 'prop-types'
import * as UI from './ProjectParticipants.styles'
import { userShape } from '@/models/User'
import { Participant } from './ParticipantCard/Participant'


const ProjectParticipants = ({
  participants
}) => {

  return (
    <UI.Wrapper>
      {participants?.map((p) => (
        <div key={p.id}>
          <Participant
            participant={p.user}
          />
          <UI.StyledDivider />
        </div>
      ))}
    </UI.Wrapper>
  )
}

ProjectParticipants.propTypes = {
  participants: PropTypes.arrayOf(userShape).isRequired
} 

export {
  ProjectParticipants
}
