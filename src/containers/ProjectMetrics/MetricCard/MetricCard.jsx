import React from 'react'
import * as UI from './MetricCard.styles'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'
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
          {metric.metrics.numberOfAdditions} {plural(metric.metrics.numberOfAdditions, 'строка', 'строки', 'строк')} {plural(metric.metrics.numberOfAdditions, 'добавлена', 'добавлены', 'добавлено')}
        </UI.Text>
        <UI.Text>
          {metric.metrics.numberOfDeletions} {plural(metric.metrics.numberOfDeletions, 'строка', 'строки', 'строк')} {plural(metric.metrics.numberOfDeletions, 'удалена', 'удалены', 'удалено')}
        </UI.Text>
        <UI.Text>
        {metric.metrics.tasksDoneCount} {plural(metric.metrics.tasksDoneCount, 'задача', 'задачи', 'задач')} {plural(metric.metrics.tasksDoneCount, 'выполнена', 'выполнены', 'выполнено')}
        </UI.Text>
        <UI.Text>
          {metric.metrics.tasksEstimateCount} {`${plural(metric.metrics.tasksEstimateCount, 'час', 'часа', 'часов')} на задачи`}
        </UI.Text>
      </UI.InfoWrapper>
    </UI.Wrapper>
  )
}

export {
  MetricCard
}
