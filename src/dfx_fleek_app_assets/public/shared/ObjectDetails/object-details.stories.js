import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';

import { ObjectDetails, ObjectDetailRow } from './index';

const categoryName = 'ObjectDetails';

storiesOf(categoryName, module).add('DetailRow', () => (
  <div style={{ backgroundColor: 'white', margin: 10, width: 500 }}>
    <ObjectDetails>
      <ObjectDetailRow
        value={text('value', 'Value 1')}
        field={text('field', 'Field 1:')}
        loading={boolean('loading', false)}
      />
      <ObjectDetailRow
        value="Value 2"
        field="Field 2:"
        loading={false}
      />
      <ObjectDetailRow
        value="Value 3 Value 3 Value 3 Value 3 Value 3 Value 3 Value 3 Value 3"
        field="Field 3:"
        loading={false}
      />
    </ObjectDetails>
  </div>
));
