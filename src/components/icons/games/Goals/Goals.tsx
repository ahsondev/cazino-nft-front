import React from 'react';
import styles from './Goals.module.scss';

interface IProps {
  className?: string;
}

const Goals: React.SFC<IProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_4" data-name="Layer 4">
          <circle className={styles['cls-1']} cx="17.5" cy="17.5" r="17.5" />
          <path
            d="M33 2H2v31h31zM21.29 32.52c-.4.11-.8.18-1.2.25a15.5 15.5 0 01-16-7.61 15.73 15.73 0 01-1.58-3.87A15.65 15.65 0 015 8.31 15.31 15.31 0 0112.08 3a16.33 16.33 0 011.63-.52 15.5 15.5 0 117.58 30.05z"
            fill="none"
          />
          <path
            className={styles['cls-1']}
            d="M17.49 32.5a14.81 14.81 0 01-5.76-1.15 24.3 24.3 0 00-1.29-5.28l-.08-.21-.21-.07a20.49 20.49 0 00-5.82-1.1 15 15 0 01-1.39-3.52 14.51 14.51 0 01-.41-4.61 33.15 33.15 0 003.59-2l.21-.14v-.26a26.62 26.62 0 00-.78-5.75A14.84 14.84 0 0112 3.54 40.4 40.4 0 0016.88 7l.22.12.23-.11a26.78 26.78 0 005.25-3.67A15.1 15.1 0 0129.83 9a41.68 41.68 0 00-2 5.69l-.06.25.18.19a27.33 27.33 0 004.55 3.78 15 15 0 01-2.71 7.33 56.78 56.78 0 00-6.19-.48H22.46l-.13.22a26.63 26.63 0 00-2.58 6.38 15 15 0 01-2.21.16zm-.33-22a25.8 25.8 0 00-6.74 4.74l-.15.16v.22a19.9 19.9 0 002.23 7.41l.1.16.18.06a19 19 0 005.09.66 19.18 19.18 0 003-.23h.23l.11-.2a27.14 27.14 0 002.9-7.42v-.26l-.19-.18a55.28 55.28 0 00-6.32-5.06l-.21-.13z"
          />
          <path
            className={styles['cls-3']}
            d="M22.68 3.93A14.59 14.59 0 0129.28 9a42.35 42.35 0 00-2 5.52l-.11.5.34.37a27.12 27.12 0 004.4 3.7 14.46 14.46 0 01-2.43 6.58 52.88 52.88 0 00-6-.45h-1.42l-.26.44a26.79 26.79 0 00-2.55 6.19 16 16 0 01-1.82.11 14.45 14.45 0 01-5.32-1 24.27 24.27 0 00-1.28-5.12l-.16-.41-.41-.15a21.94 21.94 0 00-5.69-1.11 14.41 14.41 0 01-1.22-3.16A14.74 14.74 0 013 16.86 30.21 30.21 0 006.39 15l.43-.29v-.51a27.58 27.58 0 00-.75-5.64 14.41 14.41 0 015.84-4.43 40 40 0 004.73 3.37l.45.25.46-.23a27.23 27.23 0 005.13-3.55m-4.8 20.49a20.1 20.1 0 003-.23l.46-.07.23-.4a27.54 27.54 0 002.95-7.58l.09-.52-.38-.35a53.41 53.41 0 00-6.4-5.12l-.43-.27-.4.18a26.07 26.07 0 00-6.88 4.83l-.31.32v.44a20.37 20.37 0 002.3 7.61l.19.33.35.11a19.19 19.19 0 005.24.68m4.57-21.59a26.25 26.25 0 01-5.35 3.79 43.67 43.67 0 01-5-3.63A15.31 15.31 0 005 8.31a26.34 26.34 0 01.82 5.85 31.93 31.93 0 01-3.78 2.08 15.49 15.49 0 00.4 5.05 15.73 15.73 0 001.58 3.87A20.51 20.51 0 0110 26.24a24 24 0 011.3 5.44A15.35 15.35 0 0017.49 33a16.39 16.39 0 002.6-.22 26 26 0 012.6-6.56h.85a57.38 57.38 0 016.42.52 15.45 15.45 0 003-8.1 26.58 26.58 0 01-4.7-3.86 44 44 0 012.11-5.88 15.5 15.5 0 00-7.91-6.07zm-4.58 20.63a18.35 18.35 0 01-4.95-.64 19.5 19.5 0 01-2.17-7.21 25.71 25.71 0 016.6-4.61 54 54 0 016.24 5 26.88 26.88 0 01-2.83 7.26 18.62 18.62 0 01-2.89.22z"
          />
          <path
            className={styles['cls-3']}
            d="M17.36 11a25.71 25.71 0 00-6.6 4.64 19.5 19.5 0 002.17 7.21 19.25 19.25 0 007.84.42A26.88 26.88 0 0023.6 16a54 54 0 00-6.24-5zM22.69 26.21a26 26 0 00-2.6 6.56c.4-.07.8-.14 1.2-.25A15.41 15.41 0 0030 26.71a48.13 48.13 0 00-7.31-.5zM33 18.61a15.21 15.21 0 00-2.63-9.71 44 44 0 00-2.12 5.85A26.58 26.58 0 0033 18.61zM22.46 2.83a15.44 15.44 0 00-8.75-.36 16.33 16.33 0 00-1.63.53 43.67 43.67 0 005 3.63 26.25 26.25 0 005.38-3.8zM5 8.31a15.43 15.43 0 00-3 7.93 31.93 31.93 0 003.78-2.08A26.34 26.34 0 005 8.31zM4.05 25.16a15.46 15.46 0 007.24 6.52A24 24 0 0010 26.24a20.51 20.51 0 00-5.95-1.08z"
          />
        </g>
      </g>
    </svg>
  );
};

export default Goals;
