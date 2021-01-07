import get from 'lodash/get';
import { getOlderItem } from '@Shared/utils';

export const ADD_TEAM = 'ADD_TEAM';

const teamsPresenter = (memberships, selectedId, t) => {
  if (memberships.loading || memberships.error) {
    return [];
  }

  const teams = get(memberships, 'data.getMemberships.memberships', []) || [];
  const sortedTeams = [...teams].sort(getOlderItem);

  const teamOptions = sortedTeams.map(({ teamName, teamId }) => ({
    id: teamId,
    name: teamName,
    selected: selectedId === teamId,
  }));

  const createTeamOption = {
    id: ADD_TEAM,
    name: t('layout.teamSelector.createTeam'),
    selected: false,
  };

  return [
    ...teamOptions,
    createTeamOption,
  ];
};

export default teamsPresenter;
