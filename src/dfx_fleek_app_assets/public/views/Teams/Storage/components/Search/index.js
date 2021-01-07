import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import InputSlim from '@terminal-packages/ui/core/InputSlim';

import { SEARCH_TERM_CHANGE } from '~/constants';

import useStyles from './styles';

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state) => state.storage);

  const handleSearchChange = (value) => (
    dispatch({
      value,
      type: SEARCH_TERM_CHANGE,
    })
  );

  return (
    <div className={classes.root}>
      <InputSlim
        value={searchTerm}
        placeholder="Search"
        icon={['far', 'search']}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
