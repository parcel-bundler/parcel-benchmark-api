import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export default function PageLayout(props: Props) {
  let { children } = props;

  return <main className="px-6 py-8 mx-auto max-w-6xl">{children}</main>;
}
