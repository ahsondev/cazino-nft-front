import React from 'react';
import styles from './EyeInvisible.module.scss';

interface IProps {
  className?: string;
}

const EyeInvisible: React.SFC<IProps> = ({ className = styles.fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28.49 21.53"
      className={`${styles.fill} ${className}`}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path d="M28.33 10.1a22.8 22.8 0 00-6.44-7.51l-1.72 2.47a19.79 19.79 0 015.1 5.71c-1.2 2-5.15 7.76-11 7.76a9.26 9.26 0 01-3.08-.53l-1.76 2.54a12.26 12.26 0 004.81 1c8.94 0 13.88-9.68 14.09-10.09a1.5 1.5 0 000-1.35zM8.31 16.47a19.72 19.72 0 01-5.09-5.7c1.2-2 5.15-7.77 11-7.77a9.27 9.27 0 013.06.53L19.06 1a12.31 12.31 0 00-4.82-1C5.31 0 .36 9.68.16 10.1a1.5 1.5 0 000 1.34 22.64 22.64 0 006.44 7.5z" />
          <path d="M12.27 10.77a2 2 0 011.28-1.85l2-2.92a4.88 4.88 0 00-1.34-.21 5 5 0 00-4 7.9zM16.22 10.76a2 2 0 01-1.29 1.84l-2 2.92a4.63 4.63 0 001.34.21 5 5 0 005-5 5 5 0 00-1-2.93zM7.48 21.38a1 1 0 01-.48-.16.94.94 0 01-.23-1.3L20.27.45a.92.92 0 011.29-.24.93.93 0 01.23 1.3L8.25 21a.93.93 0 01-.77.38z" />
        </g>
      </g>
    </svg>
  );
};

export default EyeInvisible;
