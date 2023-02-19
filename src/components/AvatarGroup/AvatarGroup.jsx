import React from 'react'
import { getAvatarCharacters } from '@/utils/user'
import * as UI from './AvatarGroup.styles'
import { Avatar } from 'antd'

const AvatarGroup = ({
  maxCount,
  participants,
  onSelect 
}) => (
  <Avatar.Group
    maxCount={maxCount}
    size='large'
    maxPopoverTrigger="click"
    maxStyle={{ cursor: 'pointer' }}
  >
    {participants.map((participant) => (
      <UI.StyledAvatar
        key={participant.id}
        color={participant.user.avatarColor}
        active={participant.active}
        onClick={() => onSelect(participant)}
      >
        {getAvatarCharacters(participant.user)}
      </UI.StyledAvatar>
    ))}
  </Avatar.Group>
)

export {
  AvatarGroup
}