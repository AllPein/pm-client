import { useEffect, useState } from 'react'
import { MenuTrigger } from '@/components/Menu'
import * as UI from './UserProfile.styles'

const MenuOptions = [
  {
    content: 'Посмотреть профиль',
    visible: true
  },
  {
    content: 'Выйти',
    visible: true
  }
]

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const user = {
      firstName: 'Александр',
      lastName: 'Панин',
      group: 'ПИ-19-1'
    }
    setUserInfo(user)
  }, [])
    

  const getMenuItems = () => MenuOptions
    .filter((option) => option.visible ?? true)
    .map((option, index) => ({
      content: () => (
        <UI.ProfileMenuOption
          key={index}
          onClick={option.onClick}
        >
          {option.content}
        </UI.ProfileMenuOption>
      )
    }
    ))

  const getFirstChar = (name) => name ? name.charAt(0) : ''

  const getAvatarCharacters = () => {
    const { firstName, lastName } = userInfo
    const firstNameChar = getFirstChar(firstName)
    const lastNameChar = getFirstChar(lastName)
    return `${firstNameChar}${lastNameChar}`
  }

  const getUserCaption = () => `${userInfo.firstName} ${userInfo.lastName}`

  return (
    <UI.StyledMenu
      arrow
      items={getMenuItems()}
      trigger={MenuTrigger.HOVER}
    >
      <UI.StyledButton>
        <UI.StyledAvatar>
          {getAvatarCharacters()}
        </UI.StyledAvatar>
        <UI.UserHeadline>
          <UI.FullNameBlock>
            {getUserCaption()}
          </UI.FullNameBlock>
          <UI.Group>
            {userInfo.group}
          </UI.Group>
        </UI.UserHeadline>
        <UI.DownIcon />
      </UI.StyledButton>
    </UI.StyledMenu>
  )
}

export {
  UserProfile
}
