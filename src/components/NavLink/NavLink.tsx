import React from 'react';
import { Link } from '@reach/router';
import clsx from 'clsx';

interface IProps {
  to: string;
  className?: string;
  activeClassName?: string;
}

const NavLink: React.FC<IProps> = ({ children, to, className, activeClassName }) => {
  return (
    <Link
      to={to}
      className={clsx(className)}
      getProps={({ isCurrent }) => ({
        className: isCurrent ? clsx(className, activeClassName) : undefined,
      })}
    >
      {children}
    </Link>
  );
};

export default NavLink;
