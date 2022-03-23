import React from 'react'
import * as UI from './Participant.styles'
import { userShape } from '@/models/User'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'

const Participant = ({
  participant
}) => {
  return (
    <UI.Wrapper>
      <UI.StyledAvatar color={participant.avatarColor}>
        {getAvatarCharacters(participant)}
      </UI.StyledAvatar>
      <UI.InfoWrapper>
        <UI.FullNameBlock>
          {getUserCaption(participant)}
        </UI.FullNameBlock>
        <UI.Text>
          {participant.group}
        </UI.Text>
        <UI.Text>
          {participant.role}
        </UI.Text>
      </UI.InfoWrapper>
    </UI.Wrapper>
  )
}

Participant.propTypes = {
  participant: userShape.isRequired
} 

export {
  Participant
}
