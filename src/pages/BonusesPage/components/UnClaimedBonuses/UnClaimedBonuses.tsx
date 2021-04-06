import React, { useEffect, useState } from 'react';
import { datetimeFromEpoch } from '../../../../common/util/date.util';
import BonusPosition from '../../../../components/icons/BonusPosition';
import styles from './UnClaimedBonuses.module.scss';
import BitcoinValue from '../../../../components/BitcoinValue/BitcoinValue';
import { formatBitcoin } from '../../../../common/util/format.util';
import SpinnerButton from '../../../../components/SpinnerButton';
import clsx from 'clsx';
import { CLAIM_BONUS } from '../../../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { success, error as errorToast } from '../../../../components/Toast';
import { useStateValue } from '../../../../state/index';

import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';
const bonus_claim_v1 = require('../../../../sounds/bonus-claim-v1.mp3');
const toast_v1 = require('../../../../sounds/toast-v1.mp3');
const bonus_received_v1 = require('../../../../sounds/bonus-received-v1.mp3');

interface IProps {
  bonusClaims?: any[];
  onClaimBonus?: () => void;
}

interface IUnclaimedBonusProps {
  bonusClaim: any;
  onClaimBonusCompleted: (bonusId: string) => void;
  isClickId?: boolean;
  onSetClick: (bonusId: string) => void;
}

const UnClaimedBonus: React.FC<IUnclaimedBonusProps> = ({
  bonusClaim,
  onClaimBonusCompleted = () => null,
  isClickId,
  onSetClick = () => null,
}) => {
  const [claimBonus, { loading }] = useMutation(CLAIM_BONUS);
  const [, dispatch] = useStateValue();
  const [playToast] = useSound(toast_v1.default);
  const [playToastBonus] = useSound(bonus_received_v1.default);
  const { t } = useTranslation(['bonuses']);
  const [
    {
      sidebar: { isSound, isOpen },
    },
  ] = useStateValue();

  const onClaimBonus = async (bonusId: string) => {
    console.log(' ========= ');
    onSetClick(bonusId);
    const { data, errors } = await claimBonus({ variables: { bonusId } });
    if (errors || data.claimBonus?.errors) {
      if (isSound) {
        setTimeout(() => {
          playToast();
        }, 500);
      }
      return errorToast("It's failed, please try again later.");
    }
    if (isSound) {
      setTimeout(() => {
        playToastBonus();
      }, 500);
    }
    success(`Your balance has been updated: ${formatBitcoin(data.claimBonus.balance)}`);
    dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data.claimBonus.balance } });

    onClaimBonusCompleted(bonusId);
  };
  useEffect(() => {
    console.log(isClickId);
  }, [isClickId]);

  return (
    <>
      <div
        className={clsx(
          isOpen
            ? clsx(styles.unclaimed_bonus, styles.sidebar_open)
            : clsx(styles.unclaimed_bonus, styles.sidebar_close)
        )}
      >
        <div
          className={clsx(
            isOpen ? styles.unclaimed_bonus__position : styles.unclaimed_bonus__position_close
          )}
        >
          <BonusPosition position={bonusClaim.position} />
        </div>

        <div className={styles.unclaimed_bonus__summary}>
          <p>{datetimeFromEpoch(bonusClaim.givenAt)}</p>
          <p>
            {bonusClaim.type} {t('unclaimed_bonuses.sub_name')}
          </p>
          <p>
            {t('unclaimed_bonuses.expires_on')} {datetimeFromEpoch(bonusClaim.expiresAt)}
          </p>
        </div>

        <SpinnerButton
          onClick={() => (isClickId === null ? onClaimBonus(bonusClaim.id) : null)}
          loading={loading}
          className={clsx(styles.unclaimed_bonus__button, styles.unclaimed_bonus__button_close)}
        >
          <span>{t('unclaimed_bonuses.claim_my_bonuses')}</span>
          <BitcoinValue
            className={styles.unclaimed_bonus__icon}
            value={formatBitcoin(bonusClaim.amount)}
          />
        </SpinnerButton>
      </div>

      <div
        className={clsx(
          isOpen
            ? clsx(styles.unclaimed_bonus, styles.mobile_sidebar_open)
            : clsx(styles.unclaimed_bonus, styles.mobile_sidebar_close)
        )}
      >
        <div className={styles.mobile_width}>
          <p className={styles.unclaimed_bonus__mobile__bonus_type}>{bonusClaim.type}</p>

          <div className={styles.unclaimed_bonus__mobile__pos_button}>
            <div className={styles.unclaimed_bonus__position}>
              <BonusPosition position={bonusClaim.position} />
            </div>

            <SpinnerButton
              onClick={() => (isClickId === null ? onClaimBonus(bonusClaim.id) : null)}
              loading={loading}
              className={styles.unclaimed_bonus__button}
            >
              <span>CLAIM</span>
              <BitcoinValue
                className={styles.unclaimed_bonus__icon}
                value={formatBitcoin(bonusClaim.amount)}
              />
            </SpinnerButton>
          </div>

          <div className={styles.unclaimed_bonus__mobile__summary}>
            <p>
              {t('unclaimed_bonuses.received_on')} {datetimeFromEpoch(bonusClaim.givenAt)}
            </p>
            <p>
              {t('unclaimed_bonuses.expires_on')} {datetimeFromEpoch(bonusClaim.expiresAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const UnClaimedBonuses: React.FC<IProps> = ({
  bonusClaims: defaultBonusClaims = [],
  onClaimBonus = () => null,
}) => {
  const [bonusClaims, setBonusClaims] = useState(defaultBonusClaims);
  const [playBonusClaim, { stop }] = useSound(bonus_claim_v1.default);
  const { t } = useTranslation(['bonuses']);
  const [isClickId, setIsClickId] = useState<any>(null);
  const [
    {
      sidebar: { isSound, isOpen },
    },
  ] = useStateValue();
  const onClaimBonusCompleted = (bonusId: string) => {
    if (isSound) {
      stop();
      playBonusClaim();
    }
    setBonusClaims(
      ([] as any[]).concat(bonusClaims.filter(bonusClaim => bonusClaim.id !== bonusId))
    );

    onClaimBonus();
  };
  const onSetClick = (bonusId: string) => {
    setIsClickId(bonusId);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsClickId(null);
    }, 300);
  }, [bonusClaims?.length]);

  if (bonusClaims?.length > 0) {
    return (
      <div className={clsx(isOpen ? styles.unclaimed_bonuses : styles.unclaimed_bonuses_close)}>
        <div className={styles.unclaimed_bonus__title}>{t('unclaimed_bonuses.title')}</div>

        {bonusClaims.slice(0, 3).map((bonusClaim, index) => (
          <UnClaimedBonus
            key={`unclaimed-bonus-${index}`}
            bonusClaim={bonusClaim}
            isClickId={isClickId}
            onClaimBonusCompleted={onClaimBonusCompleted}
            onSetClick={onSetClick}
          />
        ))}

        <div className={styles.unclaimed_bonus__history}>
          <a href="/transactions/bonuses" className={styles.unclaimed_bonus__history__link}>
            {t('unclaimed_bonuses.history')}
          </a>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default UnClaimedBonuses;
