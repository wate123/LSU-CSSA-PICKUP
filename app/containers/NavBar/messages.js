/*
 * NavBar Messages
 *
 * This contains all the text for the NavBar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NavBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the NavBar container!',
  },
});
