import React from 'react';
import styles from './TopBar.module.scss';
import Logo from '../../../icons/Logo';
import SidebarToggle from '../SidebarToggle';
import { useStateValue } from '../../../../state';
import SecondaryButton from '../../../SecondaryButton';
import { ButtonSize } from '../../../Button';

const TopBar: React.SFC = () => {
  const [{ sidebar }] = useStateValue();

  return (
    <div className={`container-fluid h-100`}>
      <div className={`row h-100`}>
        <div className={`col-6 ${styles.center}`}>
          <a href="/">
            <Logo className={styles.logo__size} fillClassName={styles.logo__color} />
          </a>
        </div>
        <div className={`col-6 ${styles.center} ${styles.right}`}>
          <div
            className={`${styles['sign-in__button']} ${
              !sidebar.isOpen ? styles['sign-in__button--spacing'] : ''
            }`}
          >
            <SecondaryButton size={ButtonSize.SMALL}>Sign-in</SecondaryButton>
          </div>
          <SidebarToggle arrowLeft={true} show={!sidebar.isOpen} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
