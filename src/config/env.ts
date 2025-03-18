import Constants from 'expo-constants';

const ENV = {
  dev: {
    FIREBASE_API_KEY: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
    GOOGLE_MAPS_API_KEY: Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY,
  },
  prod: {
    FIREBASE_API_KEY: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
    GOOGLE_MAPS_API_KEY: Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY,
  }
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export default getEnvVars(); 