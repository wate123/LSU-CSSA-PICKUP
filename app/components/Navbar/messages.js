/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navbar';

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
