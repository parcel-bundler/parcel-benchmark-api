import React from "react";

import "../style.css";

export type Props = {
  children: React.ReactNode;
};

export default function PageLayout(props: Props) {
  let { children } = props;

  return <main className="p-6 mx-auto max-w-6xl">{children}</main>;
}
