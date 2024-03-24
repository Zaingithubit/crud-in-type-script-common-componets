import React, { useEffect, useState } from "react";
import EntityListing from "../../components/commonComponents/EntityListing";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { IColumns } from "../../components/Interfaces/columns";

const listing: React.FC = () => {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const columns: IColumns[] = [
    { id: "make", label: "Make", minWidth: 55 },
    { id: "model", label: "Model", minWidth: 55 },
    {
      id: "vehicleIdentificationNumber",
      label: "Vehicle Identification Number",
      minWidth: 210,
    },
    { id: "engineNumber", label: "Engine Number", minWidth: 120 },
    { id: "vehicleBodyType", label: "Vehicle Body Type", minWidth: 150 },
    { id: "manufacturedYear", label: "Manufactured Year", minWidth: 150 },
    { id: "transmission", label: "Transmission", minWidth: 100 },
    { id: "odometerReading", label: "Odometer Reading", minWidth: 150 },
    { id: "regExpiry", label: "Reg Expiry", minWidth: 100 },
    { id: "licensePlate", label: "License Plate", minWidth: 100 },
    { id: "wheeler", label: "Wheelers", minWidth: 70 },
    // Add more columns as needed
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(`api/vehicle`);
      const vehiclesData = response.data;
      setTableData(vehiclesData);
    } catch (error) {
      console.error("Error fetching data:", (error as Error).message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditVehicle = (id: string) => {
    router.push(`/vehicle/${id}`);
  };

  const handleDeleteVehicle = async (
    id: string
  ): Promise<AxiosResponse | undefined> => {
    try {
      console.log(id);
      const response = await axios.delete(`api/vehicle/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntityListing
      columns={columns}
      module={"Vehicle"}
      records={tableData}
      handleEdit={handleEditVehicle}
      handleDelete={handleDeleteVehicle}
      apiAddEntity={"/vehicle"}
    />
  );
};

export default listing;
