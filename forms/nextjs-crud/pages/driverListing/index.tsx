import React, { useEffect, useState } from "react";
import EntityList from "../../components/commonComponents/EntityListing";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { IColumns } from "../../components/Interfaces/columns";


const listing: React.FC = () => {

  const [tableData, setTableData] = useState([]);
  const router = useRouter();

  const columns: IColumns[] = [
    { id: "firstName", label: "First Name", minWidth: 150 },
    { id: "lastName", label: "Last Name", minWidth: 150 },
    { id: "email", label: "Email", minWidth: 210 },
    { id: "dob", label: "D.O.B", minWidth: 120 },
    { id: "expiryDate", label: "Expiry Date", minWidth: 150 },
    { id: "address", label: "Address", minWidth: 150 },
    { id: "bloodGroup", label: "Blood Group", minWidth: 100 },
    { id: "licenseNumber", label: "License Number", minWidth: 150 },
    { id: "contactNumber", label: "Contact Number", minWidth: 150 },
    { id: "licenseClass", label: "License Class", minWidth: 100 },
    { id: "gender", label: "Gender", minWidth: 70 },
    { id: "experience", label: "Experience", minWidth: 70 },
    // Add more columns as needed
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`api/driver`);
      const driversData = response.data;

      setTableData(driversData);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditDriver = (id: string) => {
    router.push(`/driver/${id}`);
  };

  const handleDeleteDriver = async (id: string): Promise<AxiosResponse | undefined> => {
    try {
      const response = await axios.delete(`api/driver/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <EntityList
      columns={columns}
      module={"Driver"}
      records={tableData}
      handleEdit={handleEditDriver}
      handleDelete={handleDeleteDriver}
      apiAddEntity={"/driver"}
    />
  );
};

export default listing;
