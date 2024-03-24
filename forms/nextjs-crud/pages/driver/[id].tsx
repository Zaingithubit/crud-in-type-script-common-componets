import Head from "next/head";
import axios from "axios";
import DriverForm from "../../components/entities/driver/DriverForm";
import { IDriverDataProps } from "../../components/Interfaces/driver";
import { GetServerSideProps } from "next";

const id:React.FC<IDriverDataProps>  = ({ driverData }) => {
  return (
    <>
      <Head>
        <title>Edit Driver</title>
      </Head>
      <DriverForm driverListData={driverData} module={"driver"} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IDriverDataProps> = async (context) => {
  const id: string = context.params?.id as string; 
  
  try {
    // Fetch data from your API using the id
    const response = await axios.get(
      `http://localhost:3000/api/driver/?id=${id}`
    );
    const driverData = await response.data;

    return {
      props: {
        driverData,
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
