let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === '207.148.5.205') {
  backendHost = 'https://207.148.5.205';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://207.148.5.205';
}

export const API_ROOT = `${backendHost}`;
