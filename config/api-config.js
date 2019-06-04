let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'lsucssa.org') {
  backendHost = 'https://lsucssa.org';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:3001';
}

export const API_ROOT = `${backendHost}`;
