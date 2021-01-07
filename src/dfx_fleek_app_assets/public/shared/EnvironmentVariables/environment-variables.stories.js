import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import EnvironmentVariables from './index';

const categoryName = 'Start/Steps';

storiesOf(categoryName, module).add('Env variables', () => {
  const generateRandomId = () => Math.floor(Math.random() * 100000);
  const [variables, setVariables] = useState([{
    id: generateRandomId(),
  }]);
  const props = {
    i18n: {
      title: 'Basic build settings',
      subtitle: 'If you\'re using a static site generator or build tool, we\'ll need these settings to build your site.',
      newVariable: 'New variable',
      key: 'Key',
      value: 'Value',
    },
    variables,
    onChange: ({ index, id, idValue }) => {
      const oldVariable = variables[index];
      const newVariable = {
        ...oldVariable,
        [id]: idValue,
      };
      variables.splice(index, 1, newVariable);
      setVariables([...variables]);
    },
    onNewVariable: () => {
      setVariables([...variables, {
        id: generateRandomId(),
      }]);
    },
    onDeleteVariable: ({ index }) => {
      variables.splice(index, 1);
      if (!variables.length) variables.push({ id: generateRandomId() });
      setVariables([...variables]);
    },
  };
  return (
    <div style={{ margin: 20, width: 710 }}>
      <EnvironmentVariables
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
});
