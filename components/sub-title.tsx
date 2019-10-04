import React from 'react';
import classNames from 'classnames';

export type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SubTitle(props: Props) {
  let { children, className } = props;

  return <h2 className={classNames('my-2 text-xl font-bold text-gray-600', className)}>{children}</h2>;
}
