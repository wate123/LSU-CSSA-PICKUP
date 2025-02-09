/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const RELOGIN_NOTIFICATION = 'LSU_PICKUP/app/RELOGIN_NOTIFICATION';
export const UNKNOWN_SERVER_ERROR = 'LSU_PICKUP/app/UNKNOWN_SERVER_ERROR';
export const LOGIN_SUCCESS = 'LSU_PICKUP/app/LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'LSU_PICKUP/app/REGISTER_SUCCESS';
export const LOGOUT = 'LSU_PICKUP/app/LOGOUT';
export const DUPLICATE_ACCOUNT = 'LSU_PICKUP/app/DUPLICATE_ACCOUNT';
export const WRONG_PASSWORD = 'LSU_PICKUP/app/WRONG_PASSWORD';
