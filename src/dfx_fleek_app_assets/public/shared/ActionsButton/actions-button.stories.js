import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { Option, Divider, ActionsButton } from './index';

const categoryName = 'Storage';

storiesOf(categoryName, module).add('ActionsButton', () => {
  const options = [
    {
      id: 'open',
      name: 'Open',
    },
    {
      id: 'view',
      name: 'View',
    },
    {
      id: 'rename',
      name: 'Rename',
    },
    {
      id: 'download',
      name: 'Download',
    },
    {
      id: 'download-as',
      name: 'Download as',
    },
    {
      id: 'copy-path',
      name: 'Copy Path',
    },
  ];

  return (
    <div
      style={{
        width: 500,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ActionsButton
        btnName={text('btnName', 'Actions')}
        disabled={boolean('disabled', false)}
      >
        {
          options.map((option) => (
            <Option
              key={option.id}
              name={option.name}
              onClick={action(`on-click-${option.id}`)}
            />
          ))
        }
        <Divider />
        <Option
          warning
          name="Delete"
          onClick={action('delete')}
        />
      </ActionsButton>
    </div>
  );
});
