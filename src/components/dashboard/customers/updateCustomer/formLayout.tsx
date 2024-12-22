import React from "react";
 
import Address from "./address";
import NameCustomer from "./nameCustomer";
 
import Email from "./email";
import PhoneNumber from "./phoneNumber";
 
const FormLayout = () => {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          <NameCustomer />
          <PhoneNumber />
        </div>
        <div className="grid grid-cols-2">
          <Email />
          <Address />
        </div>  
      </form>
    </>
  );
};

export default FormLayout;
