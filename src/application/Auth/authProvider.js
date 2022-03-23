class AuthProvider {
  getAccessToken = () => localStorage.getItem('access_token') || null

  isAuthenticated = () => {
    return !!this.getAccessToken()
  }

  signOut = async () => {
    localStorage.removeItem('access_token')
    window.location.replace(window.location.origin)
  }
}

const authProvider = new AuthProvider()

export {
  authProvider
}
