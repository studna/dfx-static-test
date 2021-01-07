import React from 'react';
import PropTypes from 'prop-types';
import Table from '@terminal-packages/ui/core/Table';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { IconFormat } from '@terminal-packages/ui/core/DataFormat';
import {
  FileCell,
  TableRow,
  TableCell,
} from '@terminal-packages/ui/core/Table/components';

import useStyles from './styles';

/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
const UploadTable = (props) => {
  const {
    head,
    rows,
    onRemoveClick,
  } = props;

  const classes = useStyles();

  const renderHead = (tableProps) => (
    <TableRow className={classes.tableRow}>
      {tableProps.head.map((label) => (
        <TableCell key={label}>
          {label}
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  );

  const renderRow = ({
    row,
    onRemoveClick: onRemoveClickRow,
  }) => (
    <TableRow
      hover
      key={row.id}
      className={classes.tableRow}
    >
      <FileCell type={row.type} className={classes.fileCell}>
        <span className={classes.textEllipsis}>
          {row.name}
        </span>
        {row.label && (
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="span"
            className={classes.label}
          >
            {row.label}
          </Typography>
        )}
      </FileCell>
      <TableCell>
        {row.size}
      </TableCell>
      <TableCell>
        {!row.label && (
          <ButtonBase
            onClick={() => onRemoveClickRow(row)}
            disableRipple
          >
            <IconFormat
              icon={['far', 'times']}
              size={8}
            />
          </ButtonBase>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <Table
      head={head}
      rows={rows}
      renderRow={renderRow}
      renderHead={renderHead}
      onRemoveClick={onRemoveClick}
      renderLoadingRows={() => null}
    />
  );
};

UploadTable.defaultProps = {
  head: [],
  rows: [],
  onRemoveClick: () => {},
};

UploadTable.propTypes = {
  onRemoveClick: PropTypes.func,
  head: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.oneOf([
      'file',
      'folder',
      'archive',
    ]),
  })),
};

export default UploadTable;
