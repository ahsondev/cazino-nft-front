import React, { Reducer, useEffect, useReducer, useState } from 'react';
import DiceGameBoard from '../../../../components/DiceGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import { SETUP_DICE } from '../../../../graphql/queries';
import styles from './DiceGame.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import clsx from 'clsx';
import { MAKE_BET_DICE } from '../../../../graphql/mutations';
import { useStateValue } from '../../../../state';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast, info, success } from '../../../../components/Toast';
import useTargetSliderMin from '../../../../hooks/useTargetSliderMin.hook';
import useTargetSliderMax from '../../../../hooks/useTargetSliderMax.hook';
import { DiceGameAction, diceGameReducer, DiceGameState, getInitialState } from './lib/reducer';
import { DiceGameState as GameState } from '../../../../models/diceGameState.model';
import { appConfig } from '../../../../common/config';
import BetControl from '../../../../components/BetControl';
import { calcMultiplier } from '../../../../common/util/betCalc.util';
import BitcoinValue from '../../../../components/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import { useTranslation } from 'react-i18next';
import BetAmountControl from '../../../../components/BetAmountControl';

import useSound from 'use-sound';
const toast_v1 = require('../../../../sounds/toast-v1.mp3');
const balance_updated_v1 = require('../../../../sounds/balance-updated-v1.mp3');
const button_click_v1 = require('../../../../sounds/button-click-v1.mp3');

const dice_hit_v1 = require('../../../../sounds/dice-hit-v1.mp3');
const dice_win_v1 = require('../../../../sounds/dice-win-v1.mp3');
const universal_lost_v1 = require('../../../../sounds/universal-lost-v1.mp3');

interface IProps {
  loadingBet?: boolean;
  loadingSetup?: boolean;
  minProbability?: number;
  maxProbability?: number;
  he?: number;
  onPlaceBet?: (amount: number, target: number, over: boolean) => void;
  result?: number;
  errorSetup?: any;
  errorBet?: any;
  over?: boolean;
}

const DiceGame: React.FC<IProps> = ({
  onPlaceBet = () => null,
  loadingBet,
  result = 0,
  loadingSetup,
  errorSetup,
  minProbability = 0,
  maxProbability = 100,
  he = 0.01,
  errorBet,
}) => {
  const [{ auth }] = useStateValue();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<DiceGameState, DiceGameAction>>(
    diceGameReducer,
    getInitialState(he)
  );

  const minTarget = useTargetSliderMin(minProbability, maxProbability);
  const maxTarget = useTargetSliderMax(minProbability, maxProbability);

  const [playButtonClick] = useSound(button_click_v1.default, { volume: 0.9 });
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET' });
    }
  }, [auth.state]);

  useEffect(() => {
    if (errorBet) {
      dispatch({ type: 'END' });
    }
  }, [errorBet]);

  useEffect(() => {
    if (result) {
      const resultTimer = setTimeout(() => {
        dispatch({
          type: 'SET_GAME_STATE',
          payload: { gameState: GameState.HITTING },
        });
        dispatch({ type: 'SET_RESULT', payload: { result } });
      }, appConfig.diceGameTimeout / 2);

      const gameStateTimer = setTimeout(() => {
        dispatch({ type: 'END' });
        dispatch({ type: 'CALC_GAME_STATE' });
      }, appConfig.diceGameTimeout);

      return () => {
        clearTimeout(resultTimer);
        clearTimeout(gameStateTimer);
      };
    }

    dispatch({ type: 'CALC_GAME_STATE' });
  }, [result]);

  const handlePlaceBet = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (isSound) {
      playButtonClick();
    }
    dispatch({ type: 'START' });
    dispatch({ type: 'SET_RESULT', payload: { result: 0 } });
    dispatch({ type: 'CALC_GAME_STATE' });

    onPlaceBet(state.amount, +state.target.toFixed(2), state.over);
  };

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <DiceGameBoard
          className={styles.board}
          onChangeTarget={t => dispatch({ type: 'SET_TARGET', payload: { target: t } })}
          result={state.result}
          target={state.target}
          minValue={minTarget}
          maxValue={maxTarget}
          over={state.over}
          gameState={state.gameState}
        />
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className={styles.profit__container}>
                <div className={styles.profit__label}>{t('dice.profit')}</div>
                <div>
                  <BitcoinValue value={formatBitcoin(state.profit)} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-xl-2">
              <BetControl
                label={t('dice.probability')}
                icon="PROBABILITY"
                value={state.probability}
                onChange={probability =>
                  dispatch({ type: 'SET_PROBABILITY', payload: { probability } })
                }
                min={minProbability}
                max={maxProbability}
              />
            </div>
            <div className="col-4 col-xl-2">
              <BetControl
                label={t('dice.multiplier')}
                icon="MULTIPLIER"
                value={state.multiplier}
                decimalPlaces={3}
                onChange={multiplier =>
                  dispatch({ type: 'SET_MULTIPLIER', payload: { multiplier } })
                }
                min={calcMultiplier(maxProbability, state.he)}
                max={calcMultiplier(minProbability, state.he)}
              />
            </div>
            <div className="col-4 col-xl-2">
              <BetControl
                label={state.over ? t('dice.rollOver') : t('dice.rollUnder')}
                icon="OVER_UNDER"
                value={state.target}
                readonly
                onClick={() => dispatch({ type: 'TOGGLE_OVER' })}
              />
            </div>

            <div className={clsx('col-12 col-xl-3', styles.amount__container)}>
              <BetAmountControl
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-3')}>
              <SpinnerButton onClick={handlePlaceBet} loading={loadingBet || state.isRunning}>
                start
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiceGame;

export const DiceGameWithData: React.FC<RouteComponentProps> = () => {
  const [, dispatch] = useStateValue();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_DICE);
  const [makeBetDice, { loading: loadingBet }] = useMutation(MAKE_BET_DICE);
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const [playToast] = useSound(toast_v1.default, { volume: 0.9 });
  const [playToastBalanceUpdated] = useSound(balance_updated_v1.default, { volume: 0.9 });
  const [playDiceWin] = useSound(dice_win_v1.default, { volume: 0.9 });
  const [playLoss] = useSound(universal_lost_v1.default, { volume: 0.9 });
  const [playDiceHit] = useSound(dice_hit_v1.default, { volume: 0.9 });
  const [
    {
      sidebar: { isSound },
    },
  ] = useStateValue();

  const handlePlaceBet = async (amount: number, target: number, over: boolean) => {
    const { data, errors } = await makeBetDice({ variables: { betAmount: amount, target, over } });

    if (errors || data.makeBetDice?.errors) {
      setError(errors ?? data.makeBetDice?.errors);
      if (isSound) {
        playToast();
      }
      if (data.makeBetDice?.errors[0]?.code === 'MAX_PROFIT') {
        return errorToast('Your bet may reaches the profit limit.');
      }

      return errorToast("Your bet couldn't be placed, please try again.");
    }

    setResult(data?.makeBetDice?.result);
    setTimeout(() => {
      if (isSound) {
        playDiceHit();
      }
    }, appConfig.diceGameTimeout / 10);
    setTimeout(() => {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data?.makeBetDice?.balance } });
      const toast = `Your balance has been updated: ${formatBitcoin(+data?.makeBetDice?.profit)}`;
      if (+data?.makeBetDice?.profit >= 0) {
        success(toast);
      } else {
        info(toast);
      }
    }, appConfig.diceGameTimeout);

    setTimeout(() => {
      if (+data?.makeBetDice?.profit >= 0) {
        if (isSound) {
          playDiceWin();
        }
      } else {
        if (isSound) {
          playLoss();
        }
      }
    }, appConfig.diceGameTimeout / 2);
  };

  return (
    <DiceGame
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      minProbability={data?.setupDice?.minProbability}
      maxProbability={data?.setupDice?.maxProbability}
      he={data?.setupDice?.he}
      onPlaceBet={handlePlaceBet}
      result={result}
      errorSetup={errorSetup}
      errorBet={error}
    />
  );
};
