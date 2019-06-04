/*
 * LogRegister Messages
 *
 * This contains all the text for the LogRegister container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LogRegister';

export default defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: '登录',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: `注册`,
  },
});
