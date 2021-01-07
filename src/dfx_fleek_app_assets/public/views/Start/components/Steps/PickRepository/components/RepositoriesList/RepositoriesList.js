import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import StripedList from '@terminal-packages/ui/core/StripedList';
import IconFA from '@terminal-packages/ui/core/IconFA';
import InputSlim from '@terminal-packages/ui/core/InputSlim';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { useOctokit } from '@Shared';

import ReposListPlaceholder from '../ReposListPlaceholder';
import useStyles from './styles';

const RepositoriesList = ({
  onSelectRepository,
  installationId,
  children,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [, hardRefreshComponent] = useState();
  const refReposList = useRef(null);
  const refInstallationId = useRef(installationId);

  const [searchValue, setSearchValue] = useState('');
  const octokit = useOctokit();

  const onEveryResponse = ({ data }) => {
    if (refInstallationId.current !== installationId) {
      return; // if user changed account before data was fetched
    }
    const fetchedRepos = data.repositories.map((repo) => ({
      name: repo.name,
      owner: repo.owner.login,
      fullName: repo.full_name,
      url: repo.url,
    }));

    const updatedRepos = [
      ...(refReposList.current || []),
      ...fetchedRepos,
    ];

    refReposList.current = updatedRepos;
    hardRefreshComponent(refReposList.current.length);
  };

  const fetchRepos = async () => {
    refReposList.current = null;
    hardRefreshComponent(-1);

    const options = octokit
      .apps
      .listInstallationReposForAuthenticatedUser
      .endpoint
      .merge({
        installation_id: installationId,
        per_page: 100,
        v: new Date().getTime(),
      });

    try {
      await octokit.paginate(options, onEveryResponse);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error repos', error);
    }
  };

  useEffect(() => {
    if (installationId) {
      refInstallationId.current = installationId;
      fetchRepos();
    }
  }, [installationId]);

  const filterOutRepoBySearch = ({ name }) => (
    name.search(searchValue.trim() || name) !== -1
  );

  return (
    <>
      <div className={classes.filtersWrapper}>
        {children}
        <div className={classes.searchWrapper}>
          <InputSlim
            value={searchValue}
            icon={['far', 'search']}
            placeholder={t('sites.start.pickRepository.searchPlaceholder')}
            onChange={setSearchValue}
          />
        </div>
      </div>
      <div className={classes.listWrapper}>
        <StripedList>
          {refReposList.current
            ? refReposList.current
              .filter(filterOutRepoBySearch)
              .map((item) => (
                <ButtonBase
                  onClick={() => onSelectRepository(item)}
                  className={classes.row}
                  key={item.fullName}
                >
                  <IconFA
                    icon={['fab', 'github']}
                    className={classes.githubIcon}
                  />
                  <Typography className={classes.rowText}>
                    {item.fullName}
                  </Typography>
                  <IconFA
                    icon={['far', 'chevron-right']}
                    className={classes.arrowIcon}
                  />
                </ButtonBase>
              ))
            : ([
              <ReposListPlaceholder key="placeholder" />,
            ])}
        </StripedList>
      </div>
    </>
  );
};

RepositoriesList.defaultProps = {
  installationId: undefined,
};

RepositoriesList.propTypes = {
  onSelectRepository: PropTypes.func.isRequired,
  installationId: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default RepositoriesList;
