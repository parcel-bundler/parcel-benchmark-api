import React from 'react';
import NextLink from 'next/link';

export type Props = {
  children?: React.ReactNode | React.ReactNodeArray;
  href: string;
  as?: string;
};

export default function LinkButton(props: Props) {
  let { children, href, as } = props;

  return (
    <NextLink href={href} as={as} passHref>
      <a className="block rounded py-2 px-4 bg-blue-600 hover:bg-blue-400 text-white">{children}</a>
    </NextLink>
  );
}
