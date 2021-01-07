import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';

import { url, EnhancedNavigationList } from '@Shared';

import Api from './components/Api';
import Profile from './components/Profile';

import util from './util';
import useStyles from './styles';
import { SECTION_IDS, SECTION_TYPES } from './constants';

const General = () => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { t } = useTranslation();
  const apiRef = React.useRef(null);
  const profileRef = React.useRef(null);

  const { section } = match.params;

  const renderItem = (node, { id, type }) => {
    const urlDestination = type === SECTION_TYPES.MAIN ? '' : `/${id}`;

    return (
      <Link
        to={url.buildUrl(null, `/settings/general${urlDestination}`)}
        className={classes.navigationLink}
        onClick={(() => {
          if (id === SECTION_IDS.API) {
            apiRef.current.scrollIntoView({ behavior: 'smooth' });
          }

          if (id === SECTION_IDS.PROFILE) {
            profileRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        })}
      >
        <div className={classes.nodeContainer}>
          {node}
        </div>
      </Link>
    );
  };

  const items = util.getItems({
    t,
    section,
  });

  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <EnhancedNavigationList
          items={items}
          renderItem={renderItem}
        />
      </div>
      <div className={classes.sections}>
        <section ref={profileRef}>
          <Profile />
        </section>
        <br />
        <section ref={apiRef}>
          <Api />
        </section>
      </div>
    </div>
  );
};

export default General;
