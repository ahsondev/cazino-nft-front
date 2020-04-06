import React from 'react';

interface IProps {
  className?: string;
  innerClassName?: string;
}

const Clams: React.SFC<IProps> = ({ className, innerClassName }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className={className}>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_2-2" data-name="Layer 2">
          <circle className={innerClassName} cx="17.5" cy="17.5" r="17.5" />
          <path d="M17.32 21.64zM33.37 17.73a.41.41 0 000-.11 1.24 1.24 0 00-.09-.38 1.17 1.17 0 00-.31-.46l-1.16-1a19.05 19.05 0 00-2.35-4.61 2 2 0 00-1.78-.83c-.3 0-.6.06-.89.1a18.44 18.44 0 00-1.16-1.83 2.78 2.78 0 00-2.46-1.14c-.73.06-1.44.16-2.1.28a4.53 4.53 0 00-3.45-1.63h-.54a4.54 4.54 0 00-3.42 1.6c-.62-.1-1.29-.19-2-.25a2.78 2.78 0 00-2.43 1.11 16.76 16.76 0 00-1.16 1.83c-.29 0-.59-.08-.89-.1a2 2 0 00-1.79.83 19.51 19.51 0 00-2.34 4.61l-1.16 1a1.2 1.2 0 00-.32.46 1.24 1.24 0 00-.09.38.41.41 0 000 .11.93.93 0 000 .33v.12a1.23 1.23 0 00.21.39 1.15 1.15 0 00.91.45 1.18 1.18 0 00.78-.3l2-1.77a.89.89 0 01.92-.18l2.95 1.1a3.21 3.21 0 003.1-.48l4.47-3.48a.9.9 0 011.12 0l4.48 3.48a3.21 3.21 0 003.1.48l2.94-1.1a.91.91 0 01.49 0 .88.88 0 01.44.22l2 1.77a1.15 1.15 0 001.69-.15 1.2 1.2 0 00.2-.39.56.56 0 000-.12 1.84 1.84 0 00.09-.34zM30.51 22.12v-.08a1.32 1.32 0 00-.1-.39 1.22 1.22 0 00-.67-.65l-1.61-.6a4.05 4.05 0 00-1-.23 3.78 3.78 0 00-2.26.46l-1.32.73a1.29 1.29 0 01-.78.17 1.44 1.44 0 01-.54-.18l-2.86-1.68a4.1 4.1 0 00-1.86-.56h-.36a4.1 4.1 0 00-1.86.56l-2.86 1.68a1.44 1.44 0 01-.54.18 1.31 1.31 0 01-.79-.17l-1.78-1a1.8 1.8 0 00-.63-.21 4.59 4.59 0 00-2.14.23l-1.6.6a1.21 1.21 0 00-.68.65 1.47 1.47 0 00-.1.4v.07a1.41 1.41 0 00.07.5 1.18 1.18 0 001.54.76L7 22.89a8.18 8.18 0 001 1.28 1.78 1.78 0 001.37.47c.23 0 .46 0 .68-.06a9.29 9.29 0 00.9 1 2.48 2.48 0 001.88.65c.52 0 1-.09 1.51-.15l.07.06a4.12 4.12 0 002.56.84h.42a4.36 4.36 0 002.21-.59 3.7 3.7 0 00.43-.32c.51.07 1.06.12 1.62.16a2.5 2.5 0 001.89-.65 10.57 10.57 0 00.89-1c.22 0 .45.05.68.06a1.78 1.78 0 001.37-.47 8.18 8.18 0 001-1.28l1.3.49a1.18 1.18 0 001.54-.76 1.21 1.21 0 00.19-.5z" />
        </g>
      </g>
    </svg>
  );
};

export default Clams;
