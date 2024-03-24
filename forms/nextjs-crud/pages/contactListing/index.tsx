import React, { useEffect, useState } from "react";
import EntityList from "../../components/commonComponents/EntityListing";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { IColumns } from "../../components/Interfaces/columns";

const listing = () => {

  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  const columns: IColumns[] = [
    { id: "firstName", label: "First Name", minWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 210 },
    { id: "contactNo", label: "Contact Number", minWidth: 150 },
    { id: "account", label: "Account", minWidth: 150 },
    { id: "company", label: "Company", minWidth: 150 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "subject", label: "Subject", minWidth: 150 },

    // Add more columns as needed
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`api/contact`);
      const vehiclesData = response.data;
      console.log(vehiclesData, "line 29");
      setTableData(vehiclesData);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleContactEdit = (id: string) => {
    console.log(`Editing row with ID: ${id}`);
    router.push(`/contact/${id}`);
  };

  const handleContactDelete = async (id: string): Promise<AxiosResponse | undefined> => {
    try {
      const response = await axios.delete(`api/contact/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <EntityList
      columns={columns}
      module={"Contact"}
      records={tableData}
      handleEdit={handleContactEdit}
      handleDelete={handleContactDelete}
      apiAddEntity={"/contact"}
    />
  );
};

export default listing;
