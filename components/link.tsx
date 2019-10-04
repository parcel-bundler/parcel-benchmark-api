import React from 'react';
import classNames from 'classnames';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Link(props: Props) {
  let { href, children, className } = props;

  return (
    <a
      href={href}
      className={classNames('text-blue-600 hover:text-blue-800 hover:underline font-semibold inline-block', className)}
    >
      {children}
    </a>
  );
}
