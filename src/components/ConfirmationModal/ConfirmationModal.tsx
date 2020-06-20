import React from 'react';
import Modal from '../Modal';
import styles from './ConfirmationModal.module.scss';
import Button from '../Button';
import HollowButton from '../HollowButton';

interface IProps {
  show: boolean;
  text: string;
  onConfirmed?: () => void;
  onCancelled?: () => void;
}

const ConfirmationModal: React.SFC<IProps> = ({ show, onConfirmed, onCancelled, text }) => {
  return (
    <Modal show={show} title={'Confirm'} onClose={onCancelled} modalClassName={styles.modal}>
      <div className="w-100">{text}</div>
      <Button onClick={onConfirmed}>Yes</Button>
      <HollowButton onClick={onCancelled}>No</HollowButton>
    </Modal>
  );
};

export default ConfirmationModal;
