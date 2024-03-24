import React from "react";
import EntityForm from "../../commonComponents/EntityForm";
import contactValidationSchema from "./ContactValidation";
import axios, { AxiosResponse } from "axios";
import { contactSchemaTypes } from "./contact";
import { FieldValues } from "react-hook-form";
import { IContactProps } from "../../Interfaces/contact";
import { IContact } from "../../Interfaces/contact";

const Contact: React.FC<IContactProps> = ({ contactListData }) => {
  
  const onSubmitContact = async (contact: FieldValues): Promise<AxiosResponse<IContact> | undefined> => {
    let response;
    try {
      if (contact._id) {
        response = await axios.put(`/api/contact/${contact._id}`, contact);
        return response;
      } else {
        response = await axios.post(`/api/contact`, contact);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <EntityForm<IContact>
      module={"Contact"}
      entityDataTypes={contactSchemaTypes}
      entityValidations={contactValidationSchema}
      onSubmit={onSubmitContact}
      entityListData={contactListData}
      apiEndPointPush={"contactListing"}
    />
  );
};

export default Contact;
