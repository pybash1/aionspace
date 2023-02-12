import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { Toaster } from "react-hot-toast"

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>AI on Space</title>
        <meta name="description" content="Ai tools running on space" />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
