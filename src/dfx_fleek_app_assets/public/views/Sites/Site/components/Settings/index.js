import React, { useState, useEffect } from 'react';
import { scroller } from 'react-scroll';
import { url, EnhancedNavigationList } from '@Shared';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import { ID_OF_SCROLLABLE_ELEMENT } from '~/constants';

import { ContinuousDeployment, DomainManagement, General } from './components/Sections';
import getNavigationItems, { SECTION_IDS, SUB_SECTIONS, MAIN_SECTIONS } from './get-navigation-items';
import useStyles from './styles';

const Settings = (props) => {
  const { siteBySlug } = props;
  const classes = useStyles(props);
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [activeSectionId, setActiveSectionId] = useState(match.params.section);
  const items = getNavigationItems(t, activeSectionId);

  const scrollToId = (id) => (
    scroller.scrollTo(id, {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: ID_OF_SCROLLABLE_ELEMENT,
      offset: -10,
    })
  );

  useEffect(() => {
    window.analytics.page('Site - Settings', {
      path: location.pathname,
      search: location.search,
    });

    const isSubSection = SUB_SECTIONS.includes(match.params.section);
    const isMainSection = MAIN_SECTIONS.includes(match.params.section);
    if (isSubSection) {
      scrollToId(match.params.section);
    }
    if (!isSubSection && !isMainSection) {
      history.push(`/sites/${match.params.siteSlug}/settings/${SECTION_IDS.GENERAL}`);
    }
  }, []);

  const renderItem = (node, { id, type }) => (
    <Link
      to={url.buildUrl(null, `/sites/${match.params.siteSlug}/settings/${id}`)}
      className={classes.navigationLink}
      onClick={(() => {
        setActiveSectionId(id);
        if (type === 'subsection') {
          scrollToId(id);
        }
      })}
    >
      {node}
    </Link>
  );

  const getSettings = () => {
    switch (match.params.section) {
      case SECTION_IDS.GENERAL:
      case SECTION_IDS.SITE_DETAILS:
      case SECTION_IDS.DANGER_ZONE:
        return (
          <General
            siteBySlug={siteBySlug}
          />
        );
      case SECTION_IDS.BUILD_AND_DEPLOY:
      case SECTION_IDS.CONTINUOUS_DEPLOYMENT:
      case SECTION_IDS.ADVANCED_BUILD_SETTINGS:
        return (
          <ContinuousDeployment
            siteBySlug={siteBySlug}
            setActiveSectionId={setActiveSectionId}
          />
        );
      case SECTION_IDS.DOMAIN_MANAGEMENT:
      case SECTION_IDS.CUSTOM_DOMAINS:
      case SECTION_IDS.ENS:
      case SECTION_IDS.TTL:
      default:
        return (
          <DomainManagement
            siteBySlug={siteBySlug}
            setActiveSectionId={setActiveSectionId}
          />
        );
    }
  };

  return (
    <section className={classes.root}>
      <EnhancedNavigationList items={items} renderItem={renderItem} />
      <div className={classes.content}>
        {getSettings()}
      </div>
    </section>
  );
};

Settings.defaultProps = {
  siteBySlug: {
    loading: true,
    data: null,
    error: null,
  },
};

Settings.propTypes = {
  siteBySlug: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.object,
    error: PropTypes.object,
  }),
};

export default Settings;
