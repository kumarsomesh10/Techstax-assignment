import React from "react";
import "../styles/Payment.css"
import PopUp from "./PopUp";

const Payment = ({summary}) => {

  return (
    <div className="container">
      <div className="headImg">
        <img src={process.env.PUBLIC_URL + "/background.jpeg"} alt="background" />
      </div>
      <div className="paymentPopUp">
        <PopUp/>
      </div>
      
      <div className="razorPayDetails">Razor Pay Integration</div>
      <div className="btncontainer">
        <button className="paymentButton">Proceed To Pay</button>
      </div>
    </div>
  );
};

export default Payment;
