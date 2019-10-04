import React from "react";

export type Props = {
  children: React.ReactNode;
};

export default function Title(props: Props) {
  let { children } = props;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">{children}</h1>
      <div className="h-2 w-32 bg-gray-200 mb-6"></div>
    </div>
  );
}
