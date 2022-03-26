import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as UI from './ProjectParticipants.styles'
import { userShape } from '@/models/User'
import { UserCard } from '@/components/UserCard'
import { ProjectRoles } from '@/enums/Role'
import { Button } from 'antd'

const ROLES_TO_UPDATE = [ProjectRoles.OWNER]
const ROLES_TO_MAKE_TEAM_LEAD = [ProjectRoles.PARTICIPANT]

const ProjectParticipants = ({
  onAssignTeamLead,
  onAddButtonClick,
  userInfo,
  participants
}) => {
  const renderAssignmentButton = useCallback((p) => {
    if (!ROLES_TO_UPDATE.includes(userInfo?.projectRole) || !ROLES_TO_MAKE_TEAM_LEAD.includes(p.role)) {
      return 
    }

    return (
      <Button
        type='primary'
        onClick={() => onAssignTeamLead(p)}
      >
        Назначить тимлидом
      </Button>
    )
    }, [onAssignTeamLead, userInfo.projectRole])

  return (
    <UI.Wrapper>
      {participants?.map((p) => (
        <div key={p.id}>
          <UserCard
            projectRole={p.role}
            rightControls={renderAssignmentButton.bind(null, p)()}
            user={p.user}
          />
          <UI.StyledDivider />
        </div>
      ))}
      {
        ROLES_TO_UPDATE.includes(userInfo.projectRole) && (
          <UI.StyledButton
            type='primary'
            onClick={onAddButtonClick}
          >
            Добавить участника
          </UI.StyledButton>
        )
      }
    </UI.Wrapper>
  )
}

ProjectParticipants.propTypes = {
  participants: PropTypes.arrayOf(userShape).isRequired,
  onAddButtonClick: PropTypes.func,
  onAssignTeamLead: PropTypes.func,
  userInfo: userShape
} 

export {
  ProjectParticipants
}
