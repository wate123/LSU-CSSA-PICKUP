/**
 *
 * Asynchronously loads the component for VolunteerPortal
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
