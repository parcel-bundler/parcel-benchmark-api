import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function Label(props: Props) {
  let { children } = props;

  return <span className="block mb-2 text-gray-600">{children}</span>;
}
