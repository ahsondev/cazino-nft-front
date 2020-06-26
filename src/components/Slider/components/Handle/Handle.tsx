import React from 'react';
import { SliderItem, GetHandleProps } from 'react-compound-slider';
import styles from './Handle.module.scss';

interface IProps {
  domain: ReadonlyArray<number>;
  handle: SliderItem;
  getHandleProps: GetHandleProps;
  disabled?: boolean;
}

const getValue = (value: number) => {
  if (value >= 100) {
    return 100;
  }

  if (value <= 0) {
    return 0;
  }

  return value.toFixed(2);
};

const Handle: React.SFC<IProps> = ({
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
  disabled = false,
}) => (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    style={{
      top: `${percent}%`,
    }}
    className={`${styles.handle} ${disabled ? styles['handle--disabled'] : ''}`}
    {...getHandleProps(id)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="88.143"
      height="41.562"
      className={styles.handle__small}
    >
      <path
        d="M26.451 41.547h-.064V41.5L0 20.774 26.387.053V0H80.142a8 8 0 018 8v25.547a8 8 0 01-8 8H26.471v.015z"
        fill="#2a434f"
      />
      <text x="24%" y="70%" className={styles.handle__value}>
        {getValue(value)}
      </text>
    </svg>
  </div>
);

export default Handle;
