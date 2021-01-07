import Cookies from 'js-cookie';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import queryString from 'querystring';
import jwtDecode from 'jwt-decode';

import config from './config';

const ID_TOKEN_KEY = 'i_t';
const ACCESS_TOKEN_KEY = 'a_t';
const COOKIE_DOMAIN = '.fleek.co';

// auth events for listening
const events = {
  onUserAuth: 'onUserAuth',
};

const generateRandomString = () => {
  let array = new Uint8Array(36);
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  window.crypto.getRandomValues(array);

  array = array.map((x) => validChars.charCodeAt(x % validChars.length));

  return String.fromCharCode.apply(null, array);
};

const accessTokenLocalStorage = window.localStorage.getItem(ACCESS_TOKEN_KEY);

const auth = {
  events,
  cbs: [],
  idToken: window.localStorage.getItem(ID_TOKEN_KEY),
  accessToken: accessTokenLocalStorage,
  isAuthenticated: !!accessTokenLocalStorage,
  isAuthTokenRefreshingDisabled: false,
  setIdToken(newIdToken) {
    window.localStorage.setItem(ID_TOKEN_KEY, newIdToken);

    auth.idToken = newIdToken;
  },
  setAccessToken(newAccessToken) {
    auth.setTimeoutWithRedirect(newAccessToken);

    window.localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
    Cookies.set(ACCESS_TOKEN_KEY, 'true', { expires: 365, domain: COOKIE_DOMAIN });

    auth.isAuthenticated = true;
    auth.accessToken = newAccessToken;

    auth.emit(auth.events.onUserAuth, true);
  },
  getQSFromHash(hash) {
    try {
      const qs = hash.split('&').reduce((result, item) => {
        const [key, value] = item.split('=');

        return {
          ...result,
          [key]: value,
        };
      }, {});

      return qs;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[Verify user error]: ${error.message}`);

      return null;
    }
  },
  clean() {
    auth.idToken = null;
    auth.accessToken = null;
    auth.isAuthenticated = false;

    window.localStorage.removeItem(ID_TOKEN_KEY);
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    Cookies.remove(ACCESS_TOKEN_KEY, { domain: COOKIE_DOMAIN });
  },
  signout() {
    auth.clean();
    console.log('XXXXXX', `${config.auth.baseURL}/session/end`);
    window.location.replace(`${config.auth.baseURL}/session/end`);
  },
  authenticate(state, prompt) {
    if (auth.isAuthTokenRefreshingDisabled) return;

    const oidcParams = omitBy({
      state,
      prompt,
      nonce: generateRandomString(),
      client_id: config.auth.clientId,
      redirect_uri: `${config.auth.oidcRedirectUri}?dfinity=1`,
      response_mode: 'fragment',
      response_type: 'token id_token',
      scope: 'openid email profile team_info',
    }, isNil);

    const qs = queryString.stringify(oidcParams);
    window.location.replace(`${config.auth.baseURL}/auth?${qs}`);
  },
  emit(type, message) {
    // emit message to cbs if type is already registered
    if (auth.cbs[type]) {
      auth.cbs[type].forEach((cb) => {
        cb.call(null, message);
      });
    }
  },
  onListen(event, cb) {
    if (typeof auth.cbs[event] === 'undefined') {
      auth.cbs[event] = [];
    }

    // save cb
    auth.cbs[event].push(cb);

    // unsubscribe return function
    return () => {
      auth.cbs[event] = auth.cbs[event].filter((_cb) => _cb !== cb);
    };
  },
  init() {
    // window.location.href looks like
    // app.fleek.co/#/auth/cb#id_token=[idToken]
    const hashParams = window.location.href.split('#')[2] || '';
    const hashQS = auth.getQSFromHash(hashParams);
    // if there is no token is hash, but is in local storage, then setTimeout
    if (!(hashQS && hashQS.access_token) && accessTokenLocalStorage) {
      auth.setTimeoutWithRedirect(accessTokenLocalStorage);
    }
  },
  setTimeoutWithRedirect(newAccessToken) {
    let decodedToken = { exp: 0 };
    try {
      decodedToken = jwtDecode(newAccessToken);
    // eslint-disable-next-line no-empty
    } catch (err) {}
    const tokenExpirationDate = decodedToken.exp * 1000;
    const timeToExpireToken = tokenExpirationDate - new Date().getTime();

    setTimeout(() => {
      auth.authenticate(`${window.location.href.split('/#/')[1]}`);
    }, timeToExpireToken);
  },
  disableAuthTokenRefreshing() {
    auth.isAuthTokenRefreshingDisabled = true;
  },
  enableAuthTokenRefreshing() {
    auth.isAuthTokenRefreshingDisabled = false;
    auth.setTimeoutWithRedirect(auth.accessToken);
  },
};

auth.init();

export default auth;
