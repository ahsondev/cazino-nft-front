import React, { cloneElement } from 'react';
import styles from './SpinnerButton.module.scss';
import Button, { ButtonSize } from '../Button';
import SecondaryButton from '../SecondaryButton';
import Spinner from '../Spinner';
import { useTranslation } from 'react-i18next';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  color?: 'PRIMARY' | 'SECONDARY';
  loading?: boolean;
}

const SpinnerButton: React.SFC<IProps> = props => {
  const { t } = useTranslation();

  const color = props.color ?? 'PRIMARY';
  const buttonProps = {
    ...props,
    className: `${styles.button} ${props.className ?? ''}`,
    disabled: props.disabled || props.loading,
    children: props.loading ? (
      <div className={styles.loading}>
        <Spinner color={'WHITE'} className={styles.loading__spinner} />
        <div className={styles.loading__text}>{t('loading')}</div>
      </div>
    ) : (
      props.children
    ),
    loading: undefined,
  };

  let button;

  switch (color) {
    case 'PRIMARY':
      button = <Button />;
      break;

    case 'SECONDARY':
      button = <SecondaryButton />;
      break;

    default:
      throw new Error(`Unknown color: ${props.color}`);
  }

  return cloneElement(button, buttonProps);
};

export default SpinnerButton;
