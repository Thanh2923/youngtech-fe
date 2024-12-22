import React from "react";
 
import Address from "./address";
import NameCustomer from "./nameCustomer";
import PassCustomer from "./pass";
import Email from "./email";
import PhoneNumber from "./phoneNumber";
import { InputStatus } from "./status";
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
        <div className="grid grid-cols-2">
          <InputStatus />
          <PassCustomer />
        </div>
      </form>
    </>
  );
};

export default FormLayout;
