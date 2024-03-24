// Define the interface for the Vehicle
export interface IVehicle {
  _id?: string | undefined;
  make: string;
  model: string;
  vehicleIdentificationNumber: string;
  vehicleBodyType: string;
  engineNumber: string;
  manufacturedYear: number;
  transmission: string;
  odometerReading: number;
  regExpiry: string;
  licensePlate: string;
  textArea?: string; // Optional field
  radioButtonsGroup: string;
  wheeler: string[];
  isAgree: boolean;
}
export interface IVehicleProps {
  vehicleListData: IVehicle | undefined;
  module?: string;
}

export interface IVehicleDataProps {
  vehicleData: IVehicle | undefined;
}
