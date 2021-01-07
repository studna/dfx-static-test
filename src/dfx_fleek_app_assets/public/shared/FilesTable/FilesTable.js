import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Typography from '@material-ui/core/Typography';
import Table from '@terminal-packages/ui/core/Table';
import Checkbox from '@terminal-packages/ui/core/Checkbox';
import {
  FileCell,
  TableRow,
  TableCell,
  LoadingCell,
} from '@terminal-packages/ui/core/Table/components';

import useStyles from './styles';

const FilesTable = (props) => {
  const {
    head,
    rows,
    loading,
    onSingleClickRow,
    onDoubleClickRow,
    onSelectAllClick,
    allItemsSelected,
  } = props;

  const classes = useStyles();

  const renderHead = (tableProps = {}) => (
    <TableRow>
      <TableCell className={classes.checkboxCell}>
        <Checkbox
          checked={tableProps.allItemsSelected}
          onChange={tableProps.onSelectAllClick}
        />
      </TableCell>
      {tableProps.head.map((label) => (
        <TableCell key={label}>
          {label}
        </TableCell>
      ))}
    </TableRow>
  );

  const getOnCheckboxClick = (row, tableProps) => (event) => {
    event.stopPropagation();
    tableProps.onSingleClickRow(row);
  };

  /* eslint-disable react/prop-types */
  const renderRow = ({ row, ...tableProps }) => (
    <TableRow
      hover
      key={row.fullKey}
      onClick={() => tableProps.onDoubleClickRow(row)}
      className={classes.row}
    >
      <TableCell className={classes.checkboxCell}>
        <Checkbox
          checked={row.selected}
          onClick={getOnCheckboxClick(row, tableProps)}
        />
      </TableCell>
      <FileCell type={row.subtype}>
        <Typography variant="inherit" noWrap className={classes.fileName}>
          {row.name}
        </Typography>
      </FileCell>
      <TableCell>
        {moment(row.lastModified).tz(moment.tz.guess()).format('MMM d, YYYY hh:mm:ss A z')}
      </TableCell>
      <TableCell>
        {row.bytesSize}
      </TableCell>
    </TableRow>
  );

  /* eslint-disable react/no-array-index-key */
  const renderLoadingRows = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell className={classes.checkboxCell}>
            <Checkbox checked={false} />
          </TableCell>
          <LoadingCell width={192} />
          <LoadingCell width={215} />
          <LoadingCell width={80} />
        </TableRow>
      ))}
    </>
  );

  return (
    <Table
      head={head}
      rows={rows}
      loading={loading}
      renderRow={renderRow}
      renderHead={renderHead}
      onSingleClickRow={onSingleClickRow}
      onDoubleClickRow={onDoubleClickRow}
      onSelectAllClick={onSelectAllClick}
      allItemsSelected={allItemsSelected}
      renderLoadingRows={renderLoadingRows}
    />
  );
};

FilesTable.defaultProps = {
  head: [],
  rows: [],
  loading: false,
  allItemsSelected: false,
  onSingleClickRow: () => {},
  onDoubleClickRow: () => {},
  onSelectAllClick: () => {},
};

FilesTable.propTypes = {
  loading: PropTypes.bool,
  onSingleClickRow: PropTypes.func,
  onDoubleClickRow: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  allItemsSelected: PropTypes.bool,
  head: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    bytesSize: PropTypes.string,
    selected: PropTypes.bool,
    lastModified: PropTypes.date,
  })),
};

export default FilesTable;
