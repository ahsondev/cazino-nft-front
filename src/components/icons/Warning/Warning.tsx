import React from 'react';
import styles from './Warning.module.scss';
import clsx from 'clsx';

interface IProps {
  className?: string;
  circle?: boolean;
}

const Info: React.FC<IProps> = ({ className, circle }) => {
  if (circle) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={clsx(className)}>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Слой_5" data-name="Слой 5">
            <path
              className={styles['cls-1']}
              d="M17.5,0A17.5,17.5,0,1,0,35,17.5,17.51,17.51,0,0,0,17.5,0Zm2.56,24.54a2.14,2.14,0,0,1-2.14,2.14h-.83A2.14,2.14,0,0,1,15,24.54V17.69a2.14,2.14,0,0,1,2.14-2.15h.83a2.14,2.14,0,0,1,2.14,2.15ZM17.5,13.3a3.09,3.09,0,1,1,3.1-3.09A3.09,3.09,0,0,1,17.5,13.3Z"
            />
          </g>
        </g>
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.99 30.05" className={clsx(className)}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <g id="Group_1060" data-name="Group 1060">
            <path
              id="Path_1673"
              data-name="Path 1673"
              className={styles['cls-1']}
              d="M34.68,26.66,19.42,1.09a2.25,2.25,0,0,0-3.85,0L.32,26.66a2.24,2.24,0,0,0,1.92,3.39H32.75A2.24,2.24,0,0,0,35,27.8,2.27,2.27,0,0,0,34.68,26.66ZM17.5,28.71a2.13,2.13,0,1,1,2.12-2.13,2.13,2.13,0,0,1-2.12,2.13Zm2.11-8a1.69,1.69,0,0,1-1.68,1.58h-.87a1.69,1.69,0,0,1-1.68-1.58L14.6,8.62a1.69,1.69,0,0,1,1.57-1.79h2.55A1.69,1.69,0,0,1,20.4,8.52v.1Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Info;
