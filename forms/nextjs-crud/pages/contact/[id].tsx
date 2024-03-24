import Head from "next/head";
import axios from "axios";
import Contact from "../../components/entities/contact/ContactForm";
import { IContactDataProps } from "../../components/Interfaces/contact";
import { GetServerSideProps } from "next";

const id: React.FC<IContactDataProps> = ({ contactData }) => {
  return (
    <>
      <Head>
        <title>Edit Contact</title>
      </Head>
      <Contact contactListData={contactData} module={"contact"} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<IContactDataProps> = async (
  context
) => {
  const id: string = context.params?.id as string;

  try {
    // Fetch data from your API using the id
    const response = await axios.get(
      `http://localhost:3000/api/contact?id=${id}`
    );
    const contactData = await response.data;

    return {
      props: {
        contactData,
      },
    };
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return {
      notFound: true,
    };
  }
};

export default id;
