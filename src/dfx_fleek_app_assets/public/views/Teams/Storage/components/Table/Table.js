import React from 'react';
import PropTypes from 'prop-types';
import FilesTable from '@Shared/FilesTable';
import { useAccountId, url } from '@Shared';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import objectsSelector from '../../utils/objects-selector';
import { editObject, editObjects, unselectAllObjects } from '../../actions';

const Table = (props) => {
  const {
    bucket,
    prefix,
    delimiter,
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const accountId = useAccountId();
  const loading = useSelector((state) => state.storage.loading);

  const rows = useSelector((state) => objectsSelector(
    state,
    bucket,
    prefix,
    delimiter,
  ));

  const allItemsSelected = rows.length < 1
    ? false
    : rows.every((_row) => _row.selected);

  const head = [
    t('storage.table.columns.name'),
    t('storage.table.columns.lastModified'),
    t('storage.table.columns.size'),
  ];

  /* eslint-disable no-console */
  const onSingleClickRow = (row) => {
    dispatch(editObject({
      ...row,
      selected: !row.selected,
    }));
  };

  const onDoubleClickRow = (row) => {
    const pathKey = row.type === 'folder' ? 'folder' : 'object';
    const objectPath = row.type === 'folder'
      ? row.key.replace(/\/$/, '')
      : row.key;

    const redirectUrl = url.buildUrl(
      null,
      `/teams/${accountId}/storage/${bucket}/${pathKey}/${objectPath}`,
    );

    dispatch(unselectAllObjects());

    history.push(redirectUrl);
  };

  const onSelectAllClick = () => {
    if (rows.length < 1) return;

    if (allItemsSelected) {
      const newObjects = rows.map((_row) => ({
        ..._row,
        selected: false,
      }));

      dispatch(editObjects(newObjects));
    } else {
      const newObjects = rows.map((_row) => ({
        ..._row,
        selected: true,
      }));

      dispatch(editObjects(newObjects));
    }
  };

  const isCacheRows = rows.length > 0;

  return (
    <div className={classes.root}>
      <FilesTable
        head={head}
        rows={rows}
        loading={loading && !isCacheRows}
        onSingleClickRow={onSingleClickRow}
        onDoubleClickRow={onDoubleClickRow}
        onSelectAllClick={onSelectAllClick}
        allItemsSelected={!loading && allItemsSelected}
      />
      {(!loading && (!rows || rows.length === 0)) && (
        <Typography
          variant="caption"
          color="textSecondary"
          className={classes.text}
        >
          {t('storage.table.emptyMessage')}
        </Typography>
      )}
    </div>
  );
};

Table.defaultProps = {
  bucket: '',
  prefix: null,
  delimiter: '/',
};

Table.propTypes = {
  prefix: PropTypes.string,
  bucket: PropTypes.string,
  delimiter: PropTypes.string,
};

export default Table;
