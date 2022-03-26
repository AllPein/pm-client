import React from 'react'
import PropTypes from 'prop-types'
import * as UI from './UserCard.styles'
import { userShape } from '@/models/User'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'
import { UserRolesName, ProjectRolesName } from '@/enums/Role'

const UserCard = ({
  user,
  rightControls,
  projectRole
}) => {
  return (
    <UI.Wrapper>
      <UI.StyledAvatar color={user.avatarColor}>
        {getAvatarCharacters(user)}
      </UI.StyledAvatar>
      <UI.InfoWrapper>
        <UI.NameBlock>
          <UI.FullNameBlock>
            {getUserCaption(user)}
          </UI.FullNameBlock>
          <p>
            {user.ghUsername}
          </p>
        </UI.NameBlock>
        <UI.Text>
          {ProjectRolesName[projectRole] ?? UserRolesName[user.role]}
        </UI.Text>
        <UI.Text>
          {user.group}
        </UI.Text>
        {
          rightControls && rightControls
        }
      </UI.InfoWrapper>
    </UI.Wrapper>
  )
}

UserCard.propTypes = {
  user: userShape.isRequired,
  rightControls: PropTypes.element,
  projectRole: PropTypes.string
} 

export {
  UserCard
}
