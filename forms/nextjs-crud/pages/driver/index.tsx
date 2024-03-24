import DriverForm from "../../components/entities/driver/DriverForm";
import Head from "next/head";
import React from "react";

const index:React.FC = () => {
  return (
    <>
      <Head>
        <title>Driver Form</title>
      </Head>
      <DriverForm driverListData ={undefined}/>
    </>
  );
};

export default index;
