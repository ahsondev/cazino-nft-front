import React from 'react';
import { storiesOf } from '@storybook/react';
import BetResultsPage from '.';
import { GameTypes } from '../../../../models/gameTypes.model';
import { withKnobs, number, boolean, array, select } from '@storybook/addon-knobs';
import { GoalsDifficulty } from '../../../../models/betDetails.model';

storiesOf('Components/BetDetailsModal/BetResultsPage', module)
  .addDecorator(withKnobs)
  .addDecorator(storyFn => (
    <div style={{ padding: '1rem 2rem', backgroundColor: '#2d4560', minHeight: '100vh' }}>
      {storyFn()}
    </div>
  ))
  .add('Dice', () => (
    <BetResultsPage
      gameType={GameTypes.DICE}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          target: number('Roll over', 68.09369753713791),
          over: boolean('Over', false),
          winChance: number('Win Chance', 68.09369753713791),
          resultFloat: number('Result', 65.66),
        },
      }}
    />
  ))
  .add('Mines', () => (
    <BetResultsPage
      gameType={GameTypes.MINES}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          mineCount: number('Mines', 24),
          minePositions: array('Mine positions', ['3', '7', '9', '15']).map(p => parseInt(p)),
          open: array('Opened fields', ['4', '5', '8', '15', '20']).map(p => parseInt(p)),
        },
      }}
    />
  ))
  .add('Goals', () => (
    <BetResultsPage
      gameType={GameTypes.GOALS}
      loading={false}
      betDetails={{
        bet: number('Bet', 0.00006874),
        profit: number('Profit', 0.0000312),
        profitCut: boolean('Profit cut', false),
        multiplier: number('Multiplier', 1.4539),
        gameResult: {
          difficulty: select(
            'Difficulty',
            {
              OneOutOfTwo: GoalsDifficulty.GOALS1OUT2,
              TwoOutOfThree: GoalsDifficulty.GOALS2OUT3,
              OneOutOfThree: GoalsDifficulty.GOALS1OUT3,
            },
            GoalsDifficulty.GOALS1OUT2
          ),
          selections: [
            {
              luckySpots: array('Lucky Spots 1', ['0', '2']).map(p => parseInt(p)),
              selected: number('Selected 1', 1),
              step: number('Step 1', 0),
            },
            {
              luckySpots: array('Lucky Spots 2', ['0', '2']).map(p => parseInt(p)),
              selected: number('Selected 2', 1),
              step: number('Step 2', 1),
            },
            {
              luckySpots: array('Lucky Spots 3', ['0', '2']).map(p => parseInt(p)),
              selected: number('Selected 3', 1),
              step: number('Step 3', 2),
            },
          ],
        },
      }}
    />
  ));
