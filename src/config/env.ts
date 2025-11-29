export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Edura',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

export default ENV;

