import React from 'react';

import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { url } from '@Shared';

import File from './components/File';
import Folder from './components/Folder';
import Bucket from './components/Bucket';

const Storage = () => {
  const location = useLocation();
  const { path } = useRouteMatch();

  React.useEffect(() => {
    window.analytics.page('Storage', {
      path: location.pathname,
      search: location.search,
    });
  }, []);

  return (
    <Switch>
      <Route
        exact
        path={path}
        render={({ match }) => (
          // redirect to default bucket
          <Redirect
            to={url.buildUrl(null, `${match.url}/${match.params.teamId}-bucket`)}
          />
        )}
      />
      <Route exact path={`${path}/:bucketName`}>
        <Bucket />
      </Route>
      <Route path={`${path}/:bucketName/folder/*`}>
        <Folder />
      </Route>
      <Route path={`${path}/:bucketName/object/*`}>
        <File />
      </Route>
    </Switch>
  );
};

export default Storage;
