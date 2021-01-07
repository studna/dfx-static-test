import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { storiesOf } from '@storybook/react';

import UploadTable from './index';

const categoryName = 'UploadTable';

const mockRows = [
  {
    id: 'a1',
    type: 'archive',
    name: 'current-cloud-backend.zip',
    size: '429.0 B',
  },
  {
    id: 'b2',
    type: 'file',
    name: 'meta.json',
    size: '773.0 B',
  },
  {
    id: 'c3',
    type: 'file',
    name: 'image.jpeg',
    size: '112.0 B',
  },
  {
    id: 'd4',
    type: 'file',
    name: 'code.txt',
    size: '518.0 B',
  },
  {
    id: 'e5',
    type: 'file',
    name: 'script.sh',
    size: '201.0 B',
  },
  {
    id: 'f6',
    type: 'folder',
    name: 'projects',
    size: '599.5 B',
  },
  {
    id: 'g7',
    type: 'folder',
    name: 'assets',
    size: '800.0 KB',
  },
];

const mockHead = [
  'Name',
  'Size',
];

/* eslint-disable react/jsx-props-no-spreading */
storiesOf(categoryName, module).add('default', () => {
  /* eslint-disable react/prop-types */
  const TableWrapper = (props) => {
    const {
      head,
      initialRows,
    } = props;

    const [rows, setRows] = useState(initialRows);

    const onRemoveClick = (row) => setRows(rows.filter(
      (_row) => _row.id !== row.id,
    ));

    return (
      <UploadTable
        head={head}
        rows={rows}
        onRemoveClick={onRemoveClick}
      />
    );
  };

  return (
    <Paper style={{ margin: 10, padding: 10 }}>
      <TableWrapper
        head={mockHead}
        initialRows={mockRows}
      />
    </Paper>
  );
});
