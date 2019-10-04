import React from 'react';
import classNames from 'classnames';

export type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Title(props: Props) {
  let { children, className } = props;

  return (
    <div className={className}>
      <h1 className="mb-2 text-2xl font-bold text-gray-600">{children}</h1>
      <div className="h-2 w-32 bg-gray-200 mb-6"></div>
    </div>
  );
}
