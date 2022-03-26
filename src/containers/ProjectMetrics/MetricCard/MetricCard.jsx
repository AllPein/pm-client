import React, { useMemo, useState, useEffect } from 'react'
import * as UI from './MetricCard.styles'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'
import moment from 'moment'

const MetricCard = ({
  metric
}) => {

  const isUserObject = () => typeof metric.user === 'object'
  
  const getDuration = (time) => {
    return `${moment.duration(time, 's').get('days')} дней ${moment.duration(time, 's').get('hours')} часов ${moment.duration(time, 's').get('minutes')} минут`
  }

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
          {metric.metrics.count} коммитов
        </UI.Text>
        <UI.Text>
          {getDuration(metric.metrics.time)}
        </UI.Text>
      </UI.InfoWrapper>
    </UI.Wrapper>
  )
}

export {
  MetricCard
}
