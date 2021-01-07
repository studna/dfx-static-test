import React, { useEffect } from 'react';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';

import {
  DEPLOY_SUBSCRIPTION,
} from '../../../../graphql/subscriptions';

const DeploysSubscription = ({
  config,
}) => {
  const {
    data,
    subscribeToMore,
  } = config;

  useEffect(() => {
    const unsubscribes = [];

    try {
      const updateQuery = (deploys, prev, subscriptionData) => {
        if (!subscriptionData.data) return prev;
        const newDeployData = subscriptionData.data.deploySubscription;
        const newDeploys = cloneDeep(deploys);

        const deployIndex = newDeploys.findIndex(
          (newDeploy) => newDeploy.id === newDeployData.id,
        );

        if (deployIndex === -1) {
          return {
            getDeploysBySite: {
              ...data.getDeploysBySite,
              deploys: [newDeployData, ...newDeploys],
            },
          };
        }

        newDeploys[deployIndex] = {
          ...newDeploys[deployIndex],
          ...newDeployData,
        };

        return {
          getDeploysBySite: {
            ...data.getDeploysBySite,
            deploys: [...newDeploys],
          },
        };
      };

      if (data) {
        const deploys = get(data, 'getDeploysBySite.deploys', []);
        deploys.forEach((deploy) => {
          const newUnsubscribe = subscribeToMore({
            document: DEPLOY_SUBSCRIPTION,
            variables: { id: deploy.id },
            updateQuery: (prev, { subscriptionData }) => updateQuery(
              deploys, prev, subscriptionData,
            ),
          });
          unsubscribes.push(newUnsubscribe);
        });
      }
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
    }
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [data]);

  return <></>;
};

DeploysSubscription.defaultProps = {
  config: {
    data: null,
  },
};

DeploysSubscription.propTypes = {
  config: PropTypes.shape({
    data: PropTypes.shape({
      getDeploysBySite: PropTypes.object,
    }),
    subscribeToMore: PropTypes.func.isRequired,
  }),
};

export default DeploysSubscription;
