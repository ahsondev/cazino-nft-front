import React, { useState, useEffect } from 'react';

import styles from './PasswordInput.module.scss';

interface IProps {
  name?: string;
  value?: string;
  label?: string;
  onChangeValue?: (value: string) => void;
}

const PasswordInput = ({
  name = undefined,
  value: initialValue = undefined,
  label = undefined,
  onChangeValue = undefined,
}: IProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOnChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value;

    setValue(newValue);
    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  const keypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // refAmount?.current?.blur();
    }
  };

  return (
    <div className={styles.inputField__container}>
      <div className={styles.inputField__wrapper}>
        <label className={styles.inputFieldLabel}>{label}</label>
        <input
          {...(name ? { name: name } : {})}
          type="password"
          value={value}
          className={styles.inputField}
          autoComplete="off"
          onChange={handleOnChange}
          onKeyPress={keypressHandler}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
