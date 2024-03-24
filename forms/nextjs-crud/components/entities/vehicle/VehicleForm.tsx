import React from "react";
import EntityForm from "../../commonComponents/EntityForm";
import vehicleDataValidations from "./VehicleValidation";
import axios, { AxiosResponse } from "axios";
import { vehicleSchemaTypes } from "./vehicle";
import { FieldValues } from "react-hook-form";
import { IVehicle } from "../../Interfaces/vehicle";
import { IVehicleProps } from "../../Interfaces/vehicle";

const VehicleForm: React.FC<IVehicleProps> = ({ vehicleListData }) => {
  const onSubmitVehicle = async (
    vehicle: FieldValues
  ): Promise<AxiosResponse<IVehicle> | undefined> => {
    let response;
    try {
      if (vehicle._id ) {
        response = await axios.put(`/api/vehicle/${vehicle._id}`, vehicle);
        return response;
      } else {
        response = await axios.post(`/api/vehicle`, vehicle);
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntityForm<IVehicle>
      module={"Vehicle"}
      entityDataTypes={vehicleSchemaTypes}
      entityValidations={vehicleDataValidations}
      onSubmit={onSubmitVehicle}
      entityListData={vehicleListData}
      apiEndPointPush={"vehicleListing"}
    />
  );
};

export default VehicleForm;
