import React from 'react';
import { timeFromEpoch } from '../../../../common/util/date.util';
import { formatProfit, formatBet } from '../../../../common/util/format.util';
import { isPositive } from '../../../../common/util/sign.util';
import Bet from '../../../../models/bet.model';
import Dice from '../../../icons/games/Dice';
import Clams from '../../../icons/games/Clams';
import Goals from '../../../icons/games/Goals';
import Mines from '../../../icons/games/Mines';

import styles from './BetRow.module.scss';
import BitcoinValue from '../../../BitcoinValue';
import { ViewMode } from '../../LatestBetsTable';
import { GameTypes } from '../../../../models/gameTypes.model';
import { useTranslation } from 'react-i18next';

interface IProps {
  bet: Bet;
  highlight?: boolean;
  viewMode?: ViewMode;
  onRowClicked?: () => void;
}

const BetRow: React.FC<IProps> = ({
  bet,
  highlight = false,
  viewMode = ViewMode.RESPONSIVE,
  onRowClicked,
}) => {
  const { t } = useTranslation(['common']);

  let gameIcon;

  switch (bet.gameid) {
    case GameTypes.CLAMS:
      gameIcon = <Clams className={styles.icon} />;
      break;
    case GameTypes.DICE:
      gameIcon = <Dice className={styles.icon} />;
      break;
    case GameTypes.GOALS:
      gameIcon = <Goals className={styles.icon} />;
      break;
    case GameTypes.MINES:
      gameIcon = <Mines className={styles.icon} />;
      break;
  }

  const getUsername = () => {
    return bet.username !== null ? bet.username : t('hidden');
  };

  const getUsernameStyle = () => {
    return bet.username !== null ? styles.username : styles.username__hidden;
  };

  return (
    <tr
      key={bet.id}
      className={`${styles.row} ${highlight ? styles['row--highlight'] : ''}`}
      onClick={onRowClicked}
    >
      <td>
        <div>{gameIcon}</div>
      </td>

      <td>
        <div className={getUsernameStyle()}>{getUsername()}</div>
      </td>

      <td
        className={`${
          isPositive(formatProfit(bet.profit)) ? styles['row--green'] : styles['row--red']
        }`}
      >
        <BitcoinValue className="text--bold" value={formatProfit(bet.profit)} />
      </td>

      {viewMode === ViewMode.RESPONSIVE && (
        <>
          <td className={`${styles.bet}`}>
            <BitcoinValue className="text--bold" value={formatBet(bet.bet)} />
          </td>

          <td className={`${styles.bet}`}>
            <div>{timeFromEpoch(bet.time)}</div>
          </td>
        </>
      )}
    </tr>
  );
};

export default BetRow;
