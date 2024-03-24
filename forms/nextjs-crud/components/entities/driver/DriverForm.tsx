import React from "react";
import EntityForm from "../../commonComponents/EntityForm";
import driverValidationSchema from "./DriverValidation";
import axios, { AxiosResponse } from "axios";
import { driverSchemaTypes } from "./driver";
import { FieldValues } from "react-hook-form";
import { IDriverProps } from "../../Interfaces/driver";
import { IDriver } from "../../Interfaces/driver";

const DriverForm: React.FC<IDriverProps> = ({ driverListData }) => {
  const onSubmitDriver = async (driver: FieldValues): Promise<AxiosResponse<IDriver> | undefined> => {
    let response;
    try {
      if (driver._id) {
        response = await axios.put(`/api/driver/${driver._id}`, driver);
        return response;
      } else {
        response = await axios.post(`/api/driver`, driver);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntityForm<IDriver>
      entityDataTypes={driverSchemaTypes}
      entityValidations={driverValidationSchema}
      module={"Driver"}
      onSubmit={onSubmitDriver}
      entityListData={driverListData}
      apiEndPointPush={"driverListing"}
    />
  );
};

export default DriverForm;
