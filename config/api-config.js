let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'lsucssa.org:5000') {
  backendHost = 'https://lsucssa.org:5000';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'https://lsucssa.org:5000';
}

export const API_ROOT = `${backendHost}`;
