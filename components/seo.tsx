import React from "react";
import Head from "next/head";

import { SITE_NAME, SITE_DESCRIPTION } from "../constants";

export type Props = {
  title: string;
};

export default function SEO(props: Props) {
  let { title } = props;

  return (
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={SITE_DESCRIPTION} />
      <title>
        {SITE_NAME} - {title}
      </title>
    </Head>
  );
}
