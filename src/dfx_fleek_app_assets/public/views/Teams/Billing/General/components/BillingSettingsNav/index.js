import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { scroller, Element } from 'react-scroll';
import { url, EnhancedNavigationList } from '@Shared';
import { useTranslation } from 'react-i18next';
import {
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import classnames from 'classnames';

import { GA_EVENTS_CATEGORIES, ID_OF_SCROLLABLE_ELEMENT } from '~/constants';

import PlanDetails from '../PlanDetails';
import BillingDetails from '../BillingDetails';
import getNavigationItems, { SECTION_IDS, SUB_SECTIONS } from './get-navigation-items';
import useStyles from './styles';


const BillingSettingsNav = (props) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  const match = useRouteMatch();
  const history = useHistory();

  const { billingInfo, loading } = props;

  const [activeSectionId, setActiveSectionId] = useState(
    match.params.section || SECTION_IDS.GENERAL,
  );
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
    const isSubSection = SUB_SECTIONS.includes(match.params.section);

    if (isSubSection) {
      scrollToId(match.params.section);
    }
  }, []);

  const renderItem = (node, { id, type }) => {
    const urlDestination = type === 'main' ? '' : `/${id}`;

    return (
      <Link
        to={url.buildUrl(null, `/teams/${match.params.teamId}/billing/general${urlDestination}`)}
        className={classnames(classes.navigationLink, {
          [classes.mainLink]: type === 'main',
          [classes.subsectionLink]: type === 'subsection',
        })}
        onClick={(() => {
          setActiveSectionId(id);
          if (type === 'subsection') {
            scrollToId(id);
          }
        })}
      >
        <div className={classes.nodeContainer}>
          {node}
        </div>
      </Link>
    );
  };

  const activePlan = get(billingInfo, 'getTeamBillingInformation.activePlan');

  const getBandwidthInMB = (plan) => {
    const bandwidthInBytes = get(plan, 'currentBandwidthInMonth', '0');
    const bandwidthInMb = Number(bandwidthInBytes) / 1000 ** 2;
    return bandwidthInMb.toFixed(0);
  };

  return (
    <section className={classes.root}>
      <EnhancedNavigationList items={items} renderItem={renderItem} />
      <div className={classes.content}>
        <Element name={SECTION_IDS.PLAN_DETAILS} />
        <PlanDetails
          loading={loading}
          startDate={get(activePlan, 'activatedAt', '')}
          planType={get(activePlan, 'selectedPlan.name')}
          usedBandwidth={{
            value: getBandwidthInMB(activePlan),
            unit: 'mb',
            limitUnit: 'mb',
          }}
          usedMinutes={get(activePlan, 'currentBuildMinutesInMonth', '')}
          bandwidthLimit={get(activePlan, 'selectedPlan.limitBandwidthInMB', '')}
          minutesLimit={get(activePlan, 'selectedPlan.limitBuildTimeInMins', '')}
          price={get(activePlan, 'selectedPlan.priceMonthly', 0) / 100}
          onClickChangePlan={() => {
            window.ga('send', 'event', GA_EVENTS_CATEGORIES.BILLING, 'Change plan');
            window.analytics.track('Change plan', {
              teamId: match.params.teamId,
            });

            return history.push(
              url.buildUrl(null, `/teams/${match.params.teamId}/billing/change-plan`),
            );
          }}
        />

        <div className={classes.billingDetailsContainer}>
          <Element name={SECTION_IDS.BILLING_DETAILS} />
          <BillingDetails loading={loading} />
        </div>
      </div>
    </section>
  );
};

BillingSettingsNav.defaultProps = {
  billingInfo: {},
};

BillingSettingsNav.propTypes = {
  billingInfo: PropTypes.shape({}),
  loading: PropTypes.bool.isRequired,
};

export default BillingSettingsNav;
