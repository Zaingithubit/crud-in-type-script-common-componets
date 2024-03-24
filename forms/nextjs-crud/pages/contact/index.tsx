import Contact from "../../components/entities/contact/ContactForm";
import Head from "next/head";
import React from "react";

const index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Contact Form</title>
      </Head>
      <Contact contactListData={undefined} />
    </>
  );
};

export default index;
