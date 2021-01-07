import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import CommandText from './index';

const categoryName = 'CommandText';

storiesOf(categoryName, module).add('default', () => {
  const defaultProps = {
    title: text('title', 'Title'),
    detail: text('detail', 'detail'),
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <div
      style={{
        backgroundColor: 'black',
        borderRadius: 4,
        padding: 10,
        margin: 10,
        width: 200,
      }}
    >
      <CommandText {...defaultProps} />
    </div>
  );
});
