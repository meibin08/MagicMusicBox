import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import classnames from 'classnames';

export default ({ children, className = '', to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <Link
        className={classnames('custom-link', {
          active: match,
          [`${className}`]: !!className,
        })}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};
