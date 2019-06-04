class Auth {
  /**
   * Authenticate a user. Save a token string in Session Storage
   *
   * @param {string} token
   */
  static authenticateUser(token) {
    sessionStorage.setItem('accessToken', token);
  }

  /**
   * Save a token string in Session Storage
   *
   * @param {string} token
   */
  static saveRefreshToken(token) {
    sessionStorage.setItem('refreshToken', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Session Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return sessionStorage.getItem('accessToken') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Session Storage.
   *
   */
  static deauthenticateUser() {
    sessionStorage.removeItem('refreshToken');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken(tokenName) {
    return sessionStorage.getItem(tokenName);
  }
}

export default Auth;
