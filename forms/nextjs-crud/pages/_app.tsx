import React from "react";
import "../styles/globals.css";
import NaveBar from "../components/commonComponents/NaveBar";
import Footer from "../components/commonComponents/Footer";
import { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <NaveBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default App;
