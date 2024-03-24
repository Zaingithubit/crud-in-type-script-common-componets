// Define the interface for the Contact
export interface IContact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: number;
  country: string;
  subject?: string; // Optional field
  account: string;
  company: string;
  userType?: string; // Optional field
  status?: string; // Optional field
  isAgree: boolean;
}
export interface IContactProps {
  contactListData: IContact | undefined;
  module?: string;
}
export interface IContactDataProps {
  contactData: IContact | undefined;
}
