import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function Link(props: Props) {
  let { href, children } = props;

  return (
    <a href={href} className="text-blue-600 font-semibold">
      {children}
    </a>
  );
}
