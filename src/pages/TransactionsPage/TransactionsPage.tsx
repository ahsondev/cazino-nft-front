import { Redirect, RouteComponentProps, Router } from '@reach/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DetailsContainer from '../../components/DetailsContainer';
import NavLink from '../../components/NavLink';
import PageContentContainer from '../../components/PageContentContainer';
import PageHeadline from '../../components/PageHeadline';
import { BetsWithData } from './components/Bets';
import { DepositsWithData } from './components/Deposits';
import styles from './TransactionsPage.module.scss';

const TransactionsPage: React.FC<RouteComponentProps> = () => {
  const { t } = useTranslation(['transactions']);

  return (
    <div className="container">
      <PageHeadline>{t('pageHeadline')}</PageHeadline>

      <PageContentContainer>
        <nav className={styles.nav}>
          <NavLink
            to={'deposits'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            Deposits
          </NavLink>
          <NavLink
            to={'bets'}
            className={styles['nav__link']}
            activeClassName={styles['nav__link--active']}
          >
            Bets
          </NavLink>
        </nav>

        <DetailsContainer className={styles['details-container']}>
          <Router>
            <Redirect from={'/'} to={'deposits'} noThrow />
            <DepositsWithData path={'deposits'} />
            <BetsWithData path={'bets'} />
          </Router>
        </DetailsContainer>
      </PageContentContainer>
    </div>
  );
};

export default TransactionsPage;