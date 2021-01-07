import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import FilesTable from './index';

const categoryName = 'FilesTable';

const mockRows = [
  {
    id: 'a1',
    type: 'archive',
    name: 'current-cloud-backend.zip',
    lastModified: 'Apr 1, 2020 1:02:56 PM EST',
    size: '429.0 B',
    selected: false,
  },
  {
    id: 'b2',
    type: 'file',
    name: 'meta.json',
    lastModified: 'Mar 12, 2020 12:11:32 PM EST',
    size: '773.0 B',
    selected: false,
  },
  {
    id: 'c3',
    type: 'file',
    name: 'image.jpeg',
    lastModified: 'Mar 15, 2020 15:45:12 PM EST',
    size: '112.0 B',
    selected: false,
  },
  {
    id: 'd4',
    type: 'file',
    name: 'code.txt',
    lastModified: 'Feb 22, 2020 18:29:44 PM EST',
    size: '518.0 B',
    selected: false,
  },
  {
    id: 'e5',
    type: 'file',
    name: 'script.sh',
    lastModified: 'Jun 17, 2020 20:33:01 PM EST',
    size: '201.0 B',
    selected: false,
  },
  {
    id: 'f6',
    type: 'folder',
    name: 'projects',
    lastModified: 'Jan 11, 2020 19:18:00 PM EST',
    size: '599.5 B',
    selected: false,
  },
  {
    id: 'g7',
    type: 'folder',
    name: 'assets',
    lastModified: 'Apr 23, 2020 13:55:17 PM EST',
    size: '800.0 KB',
    selected: false,
  },
];

const mockHead = [
  'Name',
  'Last modified',
  'Size',
];

storiesOf(categoryName, module).add('default', () => {
  /* eslint-disable react/prop-types */
  const TableWrapper = (props) => {
    const {
      head = [],
      initialRows = [],
    } = props;

    const [rows, setRows] = useState(initialRows);

    const onSingleClickRow = (row) => setRows(rows.map((_row) => {
      if (row.id === _row.id) {
        return {
          ..._row,
          selected: !_row.selected,
        };
      }

      return _row;
    }));

    // eslint-disable-next-line no-alert
    const onDoubleClickRow = (row) => alert(`double click on: ${row.name}`);

    const onSelectAllClick = () => {
      const allSelected = rows.every((_row) => _row.selected);

      if (allSelected) {
        setRows(rows.map((_row) => ({
          ..._row,
          selected: false,
        })));
      } else {
        setRows(rows.map((_row) => ({
          ..._row,
          selected: true,
        })));
      }
    };

    const loading = boolean('loading', false);

    return (
      <FilesTable
        head={head}
        rows={rows}
        loading={loading}
        onSingleClickRow={onSingleClickRow}
        onDoubleClickRow={onDoubleClickRow}
        onSelectAllClick={onSelectAllClick}
        allItemsSelected={rows.every((_row) => _row.selected)}
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
