import React from 'react';
import styles from './Balance.module.scss';
import Bitcoin from '../../../../../icons/social/Bitcoin';

interface IProps {
  value: string;
  onClick?: () => void;
}

const Balance: React.FC<IProps> = ({ value, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      <div className={styles.container}>
        <div className={styles.border} />
        <div className={styles.value}>
          <Bitcoin className={styles.icon} innerClassName={styles.icon__inner} />
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;
