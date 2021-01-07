import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import createTerminalTheme from '@terminal-packages/fe-theme';
import {
  url,
  Modal,
  Layout,
  PrivateRoute,
  LoadInitialState,
} from '@Shared';

import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from 'react-router-dom';

import store from './redux';

import Root from './views/Root';
import Start from './views/Start';
import Sites from './views/Sites';
import Teams from './views/Teams';
import ErrorPage from './views/Error';
import AuthCallback from './views/AuthCallback';
import SignUp from './views/SignUp';
import GithubAuthorized from './views/GithubAuthorized';
import Invitation from './views/Invitation';
import Settings from './views/Settings';

import './main.css';

const theme = createTerminalTheme();

function App() {
  if (window.location.href.includes('/github-authorized')) {
    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <GithubAuthorized />
        </ThemeProvider>
      </>
    );
  }
  {console.log('render app', window.location.hash)}
  return (
    <Provider store={store}>
       <Router>
         <CssBaseline />
         <ThemeProvider theme={theme}>
           <Layout>
             <LoadInitialState />
             <Modal />
             <Switch>
               <Route path="/" exact>
                 <Root />
               </Route>
               <PrivateRoute path="/start">
                 <Start />
               </PrivateRoute>
               <PrivateRoute path="/sites">
                 <Sites />
               </PrivateRoute>
               <PrivateRoute path="/teams">
                 <Teams />
               </PrivateRoute>
               <PrivateRoute path="/invitation">
                 <Invitation />
               </PrivateRoute>
               <PrivateRoute path="/settings">
                 <Settings />
               </PrivateRoute>
               <Route path="/auth/cb">
                 <AuthCallback />
               </Route>
               <Route path="/auth/sign-up">
                 <SignUp />
               </Route>
               <Route path="/error/:errorCode">
                 <ErrorPage />
               </Route>
               <Route path="*">
                 <Redirect to={window.location.hash.startsWith('#id_token') ? `/auth/cb${window.location.hash}` : url.buildUrl(null, '/error/404')} />
               </Route>
             </Switch>
           </Layout>
         </ThemeProvider>
       </Router>
     </Provider>
  );
}

export default App;
