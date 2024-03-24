import Head from "next/head";
import axios from "axios";
import VehicleForm from "../../components/entities/vehicle/VehicleForm";
import { IVehicleDataProps } from "../../components/Interfaces/vehicle";
import { GetServerSideProps } from "next";

const id:React.FC<IVehicleDataProps> = ({ vehicleData }) => {
  return (
    <>
      <Head>
        <title>Edit Vehicle</title>
      </Head>
      <VehicleForm vehicleListData={vehicleData} module={"vehicle"} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IVehicleDataProps> = async (context) => {

  const id: string = context.params?.id as string; // Provide a default value or handle undefined case

  try {
    // Fetch data from your API using the id
    const response = await axios.get(
      `http://localhost:3000/api/vehicle/?id=${id}`
    );
    const vehicleData = await response.data;

    return {
      props: {
        vehicleData,
      },
    };
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return {
      notFound: true,
    };
  }
}

export default id;
