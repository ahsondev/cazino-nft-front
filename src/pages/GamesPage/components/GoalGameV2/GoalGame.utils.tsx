import { useEffect, useMemo, useState } from 'react';
import { Direction } from './components/GoalKeeper/GoalKeeper';

export const useGenerateBallsArray = (ballAmount: number) =>
  useMemo(() => Array.from(Array(ballAmount).keys()), [ballAmount]);

export const useDirectionMap = (ballAmount = 2): { [k in number]: Direction } =>
  ballAmount === 2
    ? { 0: 'left', 1: 'right' }
    : {
        0: 'left',
        1: 'middle',
        2: 'right',
      };

export const useKeeperStatus = (lastLucky: boolean | null) =>
  useMemo(() => (lastLucky === null ? null : lastLucky ? 'Won' : 'Lost'), [lastLucky]);

let showGameTimeout: NodeJS.Timeout;
export const useShowGame = (isLoading: boolean) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      showGameTimeout = setTimeout(() => setShow(true), 100);
    }
    return () => clearTimeout(showGameTimeout);
  }, [isLoading]);

  return show;
};