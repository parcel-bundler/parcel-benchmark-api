import React from 'react';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card(props: Props) {
  let { children, className } = props;

  return (
    <article className={classNames('w-full p-4 shadow-md rounded-lg border-solid border-2 border-gray-200', className)}>
      {children}
    </article>
  );
}
