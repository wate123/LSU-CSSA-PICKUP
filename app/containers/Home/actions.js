/*
 *
 * Home actions
 *
 */

import { NOT_LOGIN_NOTIFICATION } from './constants';

export function loginNotification() {
  return {
    type: NOT_LOGIN_NOTIFICATION,
  };
}
