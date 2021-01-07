import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';

import { url } from '@Shared';
import { newApiClient } from '@Clients';
import { GET_MEMBERSHIPS } from '@Shared/graphql/queries';
import TeamSelect from '@terminal-packages/ui/core/TeamSelect';
import auth from '~/auth';

import useStyles from './styles';
import getOptions, { ADD_TEAM } from './get-options';

const TeamSelector = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const accountId = url.getAccountIdFromUrl();
  const memberships = useQuery(GET_MEMBERSHIPS, {
    client: newApiClient,
    skip: !auth.isAuthenticated,
    onCompleted: () => {
      const options = getOptions(memberships, accountId, t);
      const selectedTeam = options.find((team) => team.selected);

      if (selectedTeam) {
        window.analytics.group(selectedTeam.id, {
          name: selectedTeam.name,
        });
      }
    },
  });

  const options = getOptions(memberships, accountId, t);

  const onChangeTeam = (option) => {
    if (option.id === ADD_TEAM) {
      history.push(url.buildUrl(null, '/teams/create/team-name'));
      return;
    }

    const newUrl = url.buildUrl(
      { accountId: option.id },
      `/teams/${option.id}/sites`,
    );

    // set selected team as current userId tracking
    window.ga('set', 'userId', option.id);
    window.analytics.group(option.id, {
      name: option.name,
    });

    history.push(newUrl);
  };

  return (
    <TeamSelect
      value={options.find((option) => option.selected)}
      options={options}
      onChange={(option) => onChangeTeam(option, history)}
      className={classes.select}
    />
  );
};

export default TeamSelector;
