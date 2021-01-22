import React, { useState, useEffect, useReducer, Reducer, useCallback } from 'react';
import GoalGameBoard from '../../../../components/GoalGameBoard';
import GoalGameAdvances from '../../../../components/GoalGameAdvances';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import ButtonGroup from '../../../../components/ButtonGroup';
import styles from './GoalGame.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue';
import Bitcoin from '../../../../components/icons/social/Bitcoin';
import BetAmountControl from '../../../../components/BetAmountControl';
import SpinnerButton from '../../../../components/SpinnerButton';
import { useStateValue } from '../../../../state';
import { useTranslation } from 'react-i18next';
import { SETUP_GOAL } from '../../../../graphql/queries';
import { MAKE_BET_GOALS, CASH_OUT_GOALS, ADVANCE_GOALS } from '../../../../graphql/mutations';
import { appConfig } from '../../../../common/config';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import { error as errorToast, success, info } from '../../../../components/Toast';
import {
  PROBABILITY_HIGH,
  PROBABILITY_MIDDLE,
  PROBABILITY_LOW,
  GoalGameState,
  GoalGameAction,
  goalGameReducer,
  getInitialState,
} from './lib/reducer';
import { GoalGameState as GameState } from '../../../../models/goalGameState.model';
import { formatBitcoin } from '../../../../common/util/format.util';

const PROBABILITES = [
  {
    label: 'High',
    value: PROBABILITY_HIGH,
    summary: '2 of 3 win',
  },
  {
    label: 'Middle',
    value: PROBABILITY_MIDDLE,
    summary: '1 of 2 win',
  },
  {
    label: 'Low',
    value: PROBABILITY_LOW,
    summary: '1 of 3 win',
  },
];

interface IProps {
  loadingSetup?: boolean;
  errorSetup?: any;
  loadingBet?: boolean;
  errorBet?: any;
  onRestart?: () => void;
  onStartGame?: (betAmount: number, probability: string) => void;
  session?: any;
  onPlaceBet?: (betId: string, selection: number, currentStep: number) => void;
  onCashOut?: (betId: string) => void;
  showProfitCutModal?: () => void;
}

const GoalGame: React.FC<IProps> = ({
  loadingSetup,
  errorSetup,
  loadingBet,
  errorBet,
  onRestart = () => null,
  onStartGame = () => null,
  session,
  onPlaceBet = () => null,
  onCashOut = () => null,
  showProfitCutModal = () => null,
}) => {
  const [{ auth }] = useStateValue();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<GoalGameState, GoalGameAction>>(
    goalGameReducer,
    getInitialState()
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [lastSpot, setLastSpot] = useState<any>(null);
  const [lastAdvanceStatus, setLastAdvanceStatus] = useState<any>(null);
  const [lastStatusTimer, setLastStatusTimer] = useState<any>(null);

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET' });
    }
  }, [auth.state]);

  useEffect(() => {
    if (session?.profitCut) return showProfitCutModal();

    if (session?.betId && state.gameState === GameState.IDLE)
      return dispatch({
        type: 'START',
        payload: { session },
      });

    if (lastSpot !== null && session && lastAdvanceStatus === null) {
      setLastAdvanceStatus(session.allowNext ? 'Won' : 'Lost');

      setLastStatusTimer(
        setTimeout(() => {
          setLastSpot(null);
          setLastAdvanceStatus(null);
          clearTimeout(lastStatusTimer);
          setLastStatusTimer(null);
        }, appConfig.goalsGameTimeout)
      );
    }

    if (session?.__typename === 'GoalsComplete') {
      return dispatch({ type: 'END' });
    }
  }, [session]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  }

  if (errorSetup) {
    return <Error />;
  }

  const handleStartGame = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    dispatch({ type: 'START' });

    onStartGame(state.amount, state.probability);

    return;
  };

  const handleCashOut = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (session?.currentStep) {
      if (session?.__typename !== 'GoalsComplete') {
        dispatch({ type: 'END' });
      } else {
        onRestart();

        setLastSpot(null);
        setLastAdvanceStatus(null);
        setLastStatusTimer(null);
        dispatch({ type: 'RESET' });
      }
    }
  };

  const handlePlaceBet = async (selection?: number) => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    if (
      lastSpot === null &&
      lastAdvanceStatus === null &&
      typeof selection === 'number' &&
      state.gameState === GameState.IN_PROGRESS
    ) {
      setLastSpot(selection);
      onPlaceBet(session.betId, selection, session.currentStep);

      return;
    }
  };

  const renderGameResultMessage = () => {
    if (state.gameState !== GameState.GAME_ENDED || session?.__typename !== 'GoalsComplete')
      return null;

    if (session.lucky)
      return (
        <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
          <div
            className={clsx(
              'col-12 col-xl-4 col-md-6',
              styles.game_result__message_box,
              styles.game_result__message_box__won
            )}
          >
            <div className="row">
              <div className={clsx('col', styles.game_result__message_box__won__title)}>
                GOAAAL!!!
              </div>
            </div>

            <div className="row">
              <div
                className={clsx(
                  'col',
                  styles.text_align__right,
                  styles.game_result__message_box__won__multiplier
                )}
              >
                &times;&nbsp;{session.profit.multiplier.toFixed(3)}
              </div>

              <div className={clsx('col', styles.text_align__left)}>
                <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
                {formatBitcoin(session.profit.profit)}
              </div>
            </div>
          </div>
        </div>
      );

    return (
      <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
        <div
          className={clsx(
            'col-12 col-xl-4 col-md-6',
            styles.game_result__message_box,
            styles.game_result__message_box__lost
          )}
        >
          <div className="row">
            <div className={clsx('col', styles.game_result__message_box__lost__title)}>
              Uh, oh... Try again!
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getButtonLabel = () => {
    if (state.gameState === GameState.IDLE) return 'start';
    if (state.gameState === GameState.IN_PROGRESS) return 'take money';
    if (state.gameState === GameState.GAME_ENDED) return 'try again';
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (lastStatusTimer !== null) {
          setLastSpot(null);
          setLastAdvanceStatus(null);
          clearTimeout(lastStatusTimer);
          setLastStatusTimer(null);
        }
      }}
    >
      <div className={styles.board__container}>
        <div className="row">
          <GoalGameBoard
            className="col-12"
            handlePlaceBet={handlePlaceBet}
            allowNext={session?.allowNext}
            lastSpot={lastSpot}
            lastAdvanceStatus={lastAdvanceStatus}
          />
        </div>

        <div className="row">
          <div
            className={clsx(
              'col-12 col-md-6 col-lg-4',
              styles.probability__container,
              state.gameState === GameState.IDLE
                ? null
                : styles.probability__container__visibility__hidden
            )}
          >
            <div className={styles.probability__label}>Probability</div>

            <ButtonGroup
              name="probability"
              items={PROBABILITES.map(item => ({
                ...item,
                onClick: () => {
                  dispatch({ type: 'SET_PROBABILITY', payload: { probability: item.value } });
                },
                checked: state.probability === item.value,
              }))}
              className={styles.probability__button_group}
            />
          </div>
        </div>

        {state.gameState !== GameState.IDLE ? (
          <GoalGameAdvances
            profits={session?.profits}
            isEnded={state.gameState === GameState.GAME_ENDED}
            className={styles.stages__container}
            currentStep={session?.currentStep}
            selections={session?.selections}
          />
        ) : null}
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div
            className={clsx(
              'row',
              styles.profit__row,
              styles.margin__horizontal_auto,
              state.gameState === GameState.IN_PROGRESS ? null : styles.profit__visibility__hidden
            )}
          >
            <div className={clsx('col-6', styles.profit)}>
              <div className={clsx(styles.profit__item, styles.profit__item__left)}>
                <div className={styles.profit__label}>
                  {t('goal.profitTotal')}&nbsp;(&times;&nbsp;
                  {session?.totalProfit.multiplier.toFixed(3)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(session?.totalProfit.profit)} />
                </div>
              </div>
            </div>

            <div className={clsx('col-6', styles.profit)}>
              <div className={clsx(styles.profit__item, styles.profit__right)}>
                <div className={styles.profit__label}>
                  {t('goal.profitNext')}&nbsp;(&times;&nbsp;
                  {session?.nextProfit.multiplier.toFixed(3)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(session?.nextProfit.profit)} />
                </div>
              </div>
            </div>
          </div>

          {renderGameResultMessage()}

          <div className={clsx('row', styles.justify_content__center)}>
            <div
              className={clsx(
                'col-12 col-xl-4',
                styles.amount__container,
                state.gameState == GameState.IDLE ? null : styles.amount__disabled
              )}
            >
              <BetAmountControl
                label={t('goal.amount')}
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
                readonly={state.gameState !== GameState.IDLE}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton
                onClick={() => {
                  state.gameState === GameState.IDLE ? handleStartGame() : handleCashOut();
                }}
                loading={loadingBet}
                disabled={session?.currentStep === 0}
              >
                {getButtonLabel()}
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalGame;

export const GoalGameWithData: React.FC<RouteComponentProps> = () => {
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_GOAL);
  const [{ auth }, dispatch] = useStateValue();
  const [makeBetGoals, { loading: loadingBet }] = useMutation(MAKE_BET_GOALS);
  const [advanceGoals, { loading: loadingAdvance }] = useMutation(ADVANCE_GOALS);
  const [cashoutGoals, { loading: loadingCashOut }] = useMutation(CASH_OUT_GOALS);
  const [error, setError] = useState();
  const [session, setSession] = useState(null);
  const [profitCut, setProfitCut] = useState(null);
  const [maxProfit, setMaxProfit] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selections, setSelections] = useState<any>([]);

  const handleRestart = () => {
    setSession(null);
    setSelections([]);
    setProfitCut(null);
    setMaxProfit(0);
  };

  const initSession = (goalsGameSetupObj: any) => {
    if (goalsGameSetupObj.__typename !== 'GoalsGameSetup') return;

    setSession(goalsGameSetupObj.session);
    setSelections(goalsGameSetupObj.session?.selections || []);
    setProfitCut(goalsGameSetupObj.session?.profitCut || null);
    setMaxProfit(goalsGameSetupObj.maxProfit);

    dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: goalsGameSetupObj.balance } });
  };

  const handleStartGame = async (betAmount: number, probability: string) => {
    const { data, errors } = await makeBetGoals({
      variables: { betAmount, difficulty: probability },
    });

    if (errors || data.makeBetGoals?.errors) {
      setError(errors ?? data.makeBetGoals?.errors);

      return errorToast("Your bet couldn't be placed, please try again.");
    }

    initSession(data.makeBetGoals);

    info(`Your balance has been updated: ${formatBitcoin(data.makeBetGoals.balance)}`);
  };

  const handlePlaceBet = async (betId: string, selection: number, currentStep: number) => {
    const { data, errors } = await advanceGoals({
      variables: { betId, selection },
    });

    if (errors || data.advanceGoals?.errors) {
      setError(errors ?? data.advanceGoals?.errors);

      return errorToast("Your bet couldn't be placed, please try again.");
    }

    switch (data.advanceGoals.__typename) {
      case 'GoalsStep':
        const __selections = [
          ...selections,
          { __typename: 'GoalsRow', selected: selection, step: currentStep, luckySpots: [] },
        ];

        setSession(
          Object.assign({}, session, {
            ...data.advanceGoals,
            currentStep: data.advanceGoals.nextStep,
            selections: __selections,
          })
        );

        setProfitCut(data.advanceGoals.profitCut);
        setSelections(__selections);
        break;

      case 'GoalsComplete':
        setSession(
          Object.assign({}, session, {
            ...data.advanceGoals,
            allowNext: false,
            selections: data.advanceGoals.result,
          })
        );

        if (data.advanceGoals.balance) {
          dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.advanceGoals.balance } });

          if (data.advanceGoals.profit.profit) {
            const toast = `Your balance has been updated: ${formatBitcoin(
              +data.advanceGoals.profit.profit
            )}`;

            if (+data.advanceGoals.profit.profit >= 0) {
              success(toast);
            } else {
              info(toast);
            }
          }
        }

        setProfitCut(data.advanceGoals.profitCut);
        setSelections(data.advanceGoals.result);
        break;
    }
  };

  const handleCashOutGoals = async (betId: string) => {
    console.log(betId);
  };

  const showProfitCutModal = useCallback(
    () =>
      profitCut &&
      auth.state === 'SIGNED_IN' &&
      navigate(`${pathname}?dialog=profit-cut`, {
        state: {
          maxProfit,
          profitCut,
        },
      }),
    [pathname, auth.state, maxProfit, profitCut]
  );

  useEffect(() => {
    if (data?.setupGoals) initSession(data.setupGoals);
  }, [data]);

  return (
    <GoalGame
      loadingSetup={loadingSetup}
      loadingBet={loadingBet || loadingAdvance || loadingCashOut}
      errorSetup={errorSetup}
      errorBet={error}
      onStartGame={handleStartGame}
      session={session}
      onPlaceBet={handlePlaceBet}
      onCashOut={handleCashOutGoals}
      showProfitCutModal={showProfitCutModal}
      onRestart={handleRestart}
    />
  );
};
