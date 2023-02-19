import { useEffect } from 'react'
import { MenuTrigger } from '@/components/Menu'
import * as UI from './UserProfile.styles'
import { getAvatarCharacters, getUserCaption } from '@/utils/user'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '@/actions/user'
import { authProvider } from '@/application/Auth/authProvider'
import { userInfoSelector } from '@/selectors/user'
import { goTo } from '@/utils/routerActions'
import { UserRoles, UserRolesName } from '@/enums/Role'

const MenuOptions = (user) => [
  {
    content: 'Посмотреть профиль',
    visible: true,
    onClick: () => {
      goTo('/user/settings')
    }
  },
  {
    content: 'Назначить роли',
    visible: user.role === UserRoles.ADMIN,
    onClick: () => {
      goTo('/admin/roles')
    }
  },
  {
    content: 'Выйти',
    visible: true,
    onClick: () => authProvider.signOut()
  }
]

const UserProfile = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(userInfoSelector)

  useEffect(() => {
    if (authProvider.isAuthenticated() && Object.keys(userInfo).length === 0) {
      dispatch(fetchUserData())
    }
  }, [dispatch, userInfo])
    

  const getMenuItems = () => MenuOptions(userInfo)
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

  return (
    <UI.StyledMenu
      arrow
      items={getMenuItems()}
      trigger={MenuTrigger.CLICK}
    >
      <UI.StyledButton>
        <UI.StyledAvatar color={userInfo?.avatarColor}>
          {getAvatarCharacters(userInfo)}
        </UI.StyledAvatar>
        <UI.UserHeadline>
          <UI.FullNameBlock>
            {getUserCaption(userInfo)}
          </UI.FullNameBlock>
          <UI.Group>
            {userInfo?.group || UserRolesName[userInfo?.role]}
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
