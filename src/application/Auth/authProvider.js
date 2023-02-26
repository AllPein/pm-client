import { isJwtExpired } from "jwt-check-expiration";
class AuthProvider {
  getAccessToken = () => localStorage.getItem("access_token") || null;

  isAuthenticated = () => {
    const token = this.getAccessToken();
    return token && !isJwtExpired(token);
  };

  signOut = async () => {
    localStorage.removeItem("access_token");
    window.location.replace(window.location.origin);
  };
}

const authProvider = new AuthProvider();

export { authProvider };
