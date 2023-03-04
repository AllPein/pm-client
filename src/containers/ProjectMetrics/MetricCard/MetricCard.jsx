import React from 'react'
import * as UI from './MetricCard.styles'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'
import { getDuration } from '@/utils/date'
import plural from 'plural-ru'

const MetricCard = ({
  metric
}) => {

  const isUserObject = () => typeof metric.user === 'object'

  return (
    <UI.Wrapper>
        <UI.StyledAvatar color={metric.user.avatarColor}>
          {getAvatarCharacters(isUserObject() ? metric.user : {
            firstName: 'Н',
            lastName: 'Н'
          })}
        </UI.StyledAvatar>
      <UI.InfoWrapper>
        <UI.NameBlock>
          <UI.FullNameBlock>
            {isUserObject() ? getUserCaption(metric.user) : metric.user}
          </UI.FullNameBlock>
          <p>
            {isUserObject() ? metric.user.ghUsername : 'Не найден в системе'}
          </p>
        </UI.NameBlock>
        <UI.Text>
          {metric.metrics.count} {plural(metric.metrics.count, 'коммит', 'коммита', 'коммитов')}
        </UI.Text>
        <UI.Text>
          {getDuration(metric.metrics.time * 3600)}
        </UI.Text>
      </UI.InfoWrapper>
    </UI.Wrapper>
  )
}

export {
  MetricCard
}
