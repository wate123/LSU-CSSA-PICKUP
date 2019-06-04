/**
 *
 * Asynchronously loads the component for RequestPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
