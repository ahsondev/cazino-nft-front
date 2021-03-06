import React from 'react';
import { storiesOf } from '@storybook/react';
import ClamGameButton from '.';
import { action } from '@storybook/addon-actions';

storiesOf('Components/GameButtons/ClamGameButton', module).add('Clam', () => (
  <ClamGameButton onClick={action('click')} />
));
