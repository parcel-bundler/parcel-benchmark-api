import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Card(props: Props) {
  let { children, className } = props;

  return (
    <article
      className={classNames("w-full p-4 shadow-md rounded-lg", className)}
    >
      {children}
    </article>
  );
}
