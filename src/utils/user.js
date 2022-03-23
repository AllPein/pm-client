const getFirstChar = (name) => name ? name?.charAt(0) : ''

export const getAvatarCharacters = (userInfo) => {
  const { firstName, lastName } = userInfo
  const firstNameChar = getFirstChar(firstName)
  const lastNameChar = getFirstChar(lastName)
  return `${firstNameChar}${lastNameChar}`
}

export const getUserCaption = (userInfo) => `${userInfo?.firstName} ${userInfo?.lastName}`