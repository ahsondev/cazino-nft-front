import React, { useState, useEffect } from 'react';

import './PasswordInput.scss';

interface IProps {
  value?: string;
  label?: string;
  onChangeValue?: (value: string) => void;
}

const PasswordInput = ({
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
    <div className="inputField__container">
      <div className="inputField__wrapper">
        <label className="inputFieldLabel">{label}</label>
        <input
          type="password"
          value={value}
          className="inputField"
          autoComplete="off"
          onChange={handleOnChange}
          onKeyPress={keypressHandler}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
