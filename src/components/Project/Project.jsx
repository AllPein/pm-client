import React from 'react'
import * as UI from './Project.styles'
import { Avatar } from 'antd'
import { goTo } from '@/utils/routerActions'
const Project = ({
  name
}) => {
  return (
    <UI.Wrapper onClick={() => goTo('/projects/asd')}>
      <UI.StyledAvatar>
        <Avatar size={128} src="https://joeschmoe.io/api/v1/random" />
      </UI.StyledAvatar>
      <UI.ProjectInfo>
        <UI.Name>
          {name}
        </UI.Name>
        <UI.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor dignissim congue. Ut eu sem mi. Suspendisse molestie massa id auctor consectetur. Vivamus sit amet tincidunt elit. Phasellus mattis dapibus tortor, et finibus libero dapibus id. Quisque urna quam, pellentesque ac congue a, vulputate nec mauris. Sed tempor venenatis massa vitae ultricies. Nam quis egestas augue, non malesuada dolor. Aenean id dui lacus. Praesent laoreet massa non ligula pellentesque, a cursus nunc feugiat. Aliquam in molestie ligula.
        </UI.Description>
        <UI.Footer>
          <UI.FooterInfo>
            Сдать до: 24.03.2022
          </UI.FooterInfo>
          <UI.FooterInfo>
            Участников: 5
          </UI.FooterInfo>   
        </UI.Footer>
      </UI.ProjectInfo>
    </UI.Wrapper>
  )
}

export {
  Project
}
