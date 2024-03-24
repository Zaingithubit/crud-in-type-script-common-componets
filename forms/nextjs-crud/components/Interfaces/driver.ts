// Define the interface for the Driver
export interface IDriver {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  expiryDate: string;
  address: string;
  bloodGroup: string;
  licenseNumber: string;
  contactNumber: number;
  licenseClass: string;
  additionalInformation?: string; // Optional field
  gender: string;
  experience: string[];
  isAgree: boolean;
}
export interface IDriverProps {
  driverListData: IDriver | undefined;
  module?: string;
}
export interface IDriverDataProps {
  driverData: IDriver | undefined;
}
