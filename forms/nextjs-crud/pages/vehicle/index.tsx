import React from "react";
import VehicleForm from "../../components/entities/vehicle/VehicleForm";
import Head from "next/head";

const index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vehicle Form</title>
      </Head>
      <VehicleForm vehicleListData={undefined} />
    </>
  );
};

export default index;
