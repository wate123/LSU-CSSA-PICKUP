/**
 *
 * Asynchronously loads the component for DisplayRequests
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
