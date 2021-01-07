import React from 'react';
import i18n from 'i18next';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import * as FullStory from '@fullstory/browser';
import SentryFullStory from '@sentry/fullstory';
import { initReactI18next } from 'react-i18next';

import App from './app';
import config from './config';
import initConfig from './locales';


window.analytics = {
  group(){},
  identify(){},
  track(){},
  page(){},
}


// import * as serviceWorker from './serviceWorker';

i18n.use(initReactI18next).init(initConfig);

FullStory.init({ orgId: config.fullStory.orgId });

Sentry.init({
  dsn: config.sentry.dsn,
  release: process.env.REACT_APP_SENTRY_RELEASE,
  environment: process.env.REACT_APP_FE_NODE_ENV || 'development',
  maxValueLength: 5000,
  integrations: [
    new SentryFullStory(config.sentry.org),
  ],
});

// const App = () => (
//   <h1>App3</h1>
// )

ReactDOM.render(<App />, document.getElementById('app'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
