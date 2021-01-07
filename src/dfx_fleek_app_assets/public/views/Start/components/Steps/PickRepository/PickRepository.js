import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Selector from '@terminal-packages/ui/core/Selector';
import useGithubToken from '@Shared/hooks/useGithubToken';
import { url, useOctokit } from '@Shared';
import StepBase from '@Shared/StepBase';
import { GA_EVENTS_CATEGORIES } from '~/constants';
import RepositoriesList from './components/RepositoriesList';
import EditGithubPermissions from './components/EditGithubPermissions';
import { transformAccountToSelectorFormat } from './utils';

const initialState = {
  selectedAccount: undefined,
  accountsList: [],
};

const PickRepository = ({ goToPreviousStep, goToNextStep }) => {
  const [state, setState] = useState(initialState);
  const { t } = useTranslation();
  const { apps } = useOctokit();
  const [loadingGithubToken, githubToken] = useGithubToken();

  const loadGithubData = async () => {
    try {
      const { data } = await apps.listInstallationsForAuthenticatedUser({
        per_page: 100,
        v: new Date().getTime(),
      });

      const accounts = data.installations.map(({ id, account }) => ({
        installationId: id,
        account: {
          name: account.login,
          avatar: account.avatar_url,
        },
      }));
      const defaultSelectedAccount = accounts[accounts.length - 1];
      setState({
        accountsList: accounts,
        selectedAccount: defaultSelectedAccount,
      });
    } catch (error) {
      if (error.status === 401) {
        goToPreviousStep();
      }
    }
  };

  const selectorOptions = state.accountsList.map((account, index) => (
    transformAccountToSelectorFormat(
      account,
      state.selectedAccount
        ? account.name === state.selectedAccount.name
        : index === 0,
    )
  ));
  const selectorValue = transformAccountToSelectorFormat(
    state.selectedAccount || {},
    true,
  );

  useEffect(() => {
    if (githubToken) {
      loadGithubData();
    } else if (!loadingGithubToken) {
      goToPreviousStep();
    }
  }, [loadingGithubToken, githubToken]);

  const onChangeAccount = (value) => {
    setState({
      ...state,
      selectedAccount: state.accountsList.find(
        ({ account }) => value.name === account.name,
      ),
    });
  };

  const refetchData = () => {
    if (githubToken) {
      setState(initialState);
      loadGithubData();
    }
  };

  return (
    <StepBase
      title={t('sites.start.pickRepository.title')}
      subtitle={t('sites.start.pickRepository.subtitle')}
    >
      <RepositoriesList
        onSelectRepository={(repository) => {
          window.ga('send', 'event', GA_EVENTS_CATEGORIES.SITES, 'Pick example Repo', repository.url);
          window.analytics.track('Pick example Repo', {
            url: repository.url,
            repoName: repository.name,
            accountName: repository.owner,
            teamId: url.getAccountIdFromUrl(),
          });

          goToNextStep(
            state.selectedAccount.installationId,
            state.selectedAccount.account.name,
            repository.name,
          );
        }}
        installationId={
          state.selectedAccount && state.selectedAccount.installationId
        }
      >
        <Selector
          options={selectorOptions}
          onChange={onChangeAccount}
          value={selectorValue}
        />
      </RepositoriesList>
      <EditGithubPermissions
        onUpdatePermissions={refetchData}
      />
    </StepBase>
  );
};

PickRepository.propTypes = {
  goToPreviousStep: PropTypes.func.isRequired,
  goToNextStep: PropTypes.func.isRequired,
};

export default PickRepository;
