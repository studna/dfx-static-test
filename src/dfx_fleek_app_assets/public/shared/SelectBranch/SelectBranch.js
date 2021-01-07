import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import Autocomplete from '@terminal-packages/ui/core/Autocomplete';
import useGithubToken from '@Shared/hooks/useGithubToken';
import { useOctokit } from '@Shared';
import useStyles from './styles';

const SelectBranch = ({
  repositoryName,
  githubAccountName,
  branch,
  setBranch,
  defaultBranchName,
}) => {
  const [, hardRefreshComponent] = useState();
  const refBranchesList = useRef(null);
  // list of branches is stored in ref, because we need to have updated value
  // always in "onEveryResponse" function, which is passed one time (useEffect)
  // to octokit.paginate and never update
  // but still we need to rerender upon update value so "hardRefreshComponent"
  const octokit = useOctokit();
  const [, githubToken] = useGithubToken();
  const classes = useStyles();
  const { t } = useTranslation();

  const onEveryResponse = ({ data }) => {
    if (!refBranchesList.current) {
      const defaultBranch = data.find(({ name }) => name === defaultBranchName);
      setBranch(defaultBranch ? defaultBranchName : get(data[0], 'name'));
    }
    const updatedBranches = [
      ...(refBranchesList.current || []),
      ...data.map(({ name }) => ({ name })),
    ];
    refBranchesList.current = updatedBranches;
    hardRefreshComponent(refBranchesList.current.length);
  };

  const fetchBranches = async () => {
    const options = octokit.repos.listBranches.endpoint.merge({
      owner: githubAccountName,
      repo: repositoryName,
      per_page: 100,
    });

    try {
      await octokit.paginate(options, onEveryResponse);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error branches', error);
    }
  };

  useEffect(() => {
    if (githubToken) {
      fetchBranches();
    }
  }, [githubToken]);

  const onChange = (value) => {
    const isAnyBranch = !!get(refBranchesList.current, 'length', 0);
    if (isAnyBranch && value) {
      setBranch(value);
    }
  };

  return (
    <div className={classes.iconContainer}>
      <Autocomplete
        data={refBranchesList.current || []}
        valueKey="name"
        selectedValue=""
        placeholder={branch || t('sites.start.buildOptions.branchesPlaceholder')}
        onChange={onChange}
        isUsedPlaceholderAsValue
        isLoading={!refBranchesList.current}
      />
    </div>
  );
};

SelectBranch.defaultProps = {
  branch: '',
};

SelectBranch.propTypes = {
  repositoryName: PropTypes.string.isRequired,
  defaultBranchName: PropTypes.string.isRequired,
  githubAccountName: PropTypes.string.isRequired,
  setBranch: PropTypes.func.isRequired,
  branch: PropTypes.string,
};

export default SelectBranch;
