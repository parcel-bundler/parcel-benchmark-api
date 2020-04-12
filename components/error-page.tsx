import React from 'react';

import Title from './title';

export default function ErrorPage(props: { error: string }) {
  let { error } = props;

  return (
    <div>
      <Title className="mb-8">An error occured</Title>
      <div className="my-4">{error}</div>
    </div>
  );
}
