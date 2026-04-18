import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getApiBaseCandidates = () => {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL;
  const candidates = [];

  if (configuredUrl) {
    candidates.push(configuredUrl.replace(/\/$/, ''));
  }

  const hostUri =
    Constants?.expoConfig?.hostUri ||
    Constants?.manifest2?.extra?.expoClient?.hostUri ||
    Constants?.manifest?.debuggerHost;

  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host) {
      candidates.push(`http://${host}:5000`);
    }
  }

  if (Platform.OS === 'android') {
    candidates.push('http://10.0.2.2:5000');
  }

  candidates.push('http://localhost:5000');
  candidates.push('http://127.0.0.1:5000');

  return [...new Set(candidates)];
};

const createClients = () => {
  const baseUrls = getApiBaseCandidates();
  return baseUrls.map((baseURL) =>
    axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );
};

export const apiRequest = async (config) => {
  const clients = createClients();
  let lastNetworkError = null;
  let lastNotFoundError = null;

  for (const client of clients) {
    try {
      const response = await client.request(config);
      return response.data;
    } catch (error) {
      if (error?.response) {
        if (error.response.status === 404) {
          lastNotFoundError = error;
          continue;
        }
        throw error;
      }
      lastNetworkError = error;
    }
  }

  if (lastNotFoundError) {
    const tried = getApiBaseCandidates().join(', ');
    throw new Error(
      `Auth route not found on backend. Tried: ${tried}. Make sure updated backend with /api/auth routes is running on port 5000.`
    );
  }

  const tried = getApiBaseCandidates().join(', ');
  throw new Error(
    `Could not reach backend. Tried: ${tried}. ${lastNetworkError?.message || ''}`.trim()
  );
};

export const authLogin = (payload) =>
  apiRequest({
    method: 'POST',
    url: '/api/auth/login',
    data: payload,
  });

export const authSignup = (payload) =>
  apiRequest({
    method: 'POST',
    url: '/api/auth/signup',
    data: payload,
  });

export const logFeatureInteraction = (payload) =>
  apiRequest({
    method: 'POST',
    url: '/api/interactions',
    data: payload,
  });
