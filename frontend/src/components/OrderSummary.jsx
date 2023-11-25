import React, { useState } from "react";
import axios from "axios";
import "../styles/OrderSummary.css"
import PopUp from "./PopUp";
import AlertPopUp from "./AlertPopUp";

const OrderSummary = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderConfirmation, setOrderConfirmation] = useState(false)

  function toggleOrderConfirmation(){
    setOrderConfirmation(!orderConfirmation)
  }
  const [latestLetter, setLatestLetter] = useState("@");

  const initialTotal = 0;

  const [summary, setSummary] = useState({
    subtotal: initialTotal,
    discount: initialTotal / 10,
    deliveryFee: 30,
    taxes: (initialTotal - initialTotal / 10) * 0.04,
    total:
      initialTotal -
      initialTotal / 10 +
      30 +
      (initialTotal - initialTotal / 10) * 0.04,
  });

  const generateNextName = () => {
    const nextLetter = String.fromCharCode(latestLetter.charCodeAt(0) + 1);
    setLatestLetter(nextLetter);
    return `Margarita ${nextLetter}`;
  };

  const generateRandomPrice = () => {
    // Generate a random number between 200 and 1000
    return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  };

  // Calculate the summary when order items change
  const updateSummary = (price) => {
    const subtotal = +(summary.subtotal + price).toFixed(2);
    const discount = +(0.1 * subtotal).toFixed(2); // 10% discount
    const discountedTotal = +(subtotal - discount).toFixed(2);
    const taxes = +(0.04 * discountedTotal).toFixed(2); // 4% taxes
    const total = +(discountedTotal + summary.deliveryFee + taxes).toFixed(2);

    setSummary({
      ...summary,
      subtotal,
      discount,
      taxes,
      total,
    });
  };

  // Add an item to the order
  const addItem = () => {
    const newItem = {
      name: generateNextName(),
      price: generateRandomPrice(),
    };

    setOrderItems([...orderItems, newItem]);
    updateSummary(newItem.price);
  };

  const removeItem = (index) => {
    const removedItem = orderItems[index];
    const newOrderItems = orderItems.filter((item, i) => i !== index);

    setOrderItems(newOrderItems);
    updateSummary(-removedItem.price); // Subtract the price of the removed item
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_2Yt9avgI30A6nR",
      amount: data.amount,
      currency: data.currency,
      name: "Food order",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:8080/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
          if (data.message === "Payment verified successfully") {
            setOrderConfirmation(true)
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = "http://localhost:8080/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: summary.total });
      console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="orderContainer">
      <div className="orderPopUp">
        <PopUp/>
      </div>
      {orderConfirmation ?
      <div className="orderConfirmation">
        <AlertPopUp total={summary.total} toggle={toggleOrderConfirmation} />
      </div>
        : null}

      <div className="headImg">
        <img src={process.env.PUBLIC_URL + "/background.jpeg"} alt="background" />
      </div>
      
      <div className="orderSummary">
        <div className="summaryTitle">
          <h2>Your Order</h2>
          <button className="addItemBtn" onClick={orderConfirmation ? null : addItem}>Add Item + </button>
        </div>
        <div>
          {orderItems.map((item, index) => (
            <div>
              <div className="orderTable">
                <div className="orderItem">
                  <div className="orderNumber">{index + 1} </div>
                  <div className="orderName">{item.name}</div>
                </div>
                <div className="priceContainer">
                  <div className="orderPrice"><span className="rsIcon"> &#x20B9;</span>{item.price}</div>
                  <button className="removeItem" onClick={() => removeItem(index)}>-</button>
                </div>
              </div>
              <hr className="line" />
            </div>
          ))}
        </div>


        <div className="orderTotal">
          <h2 className="underline">Summary</h2>
          <div className="orderTotalItem">
            <div className="orderTotalName">SubTotal </div>
            <div className="orderTotalPrice"><span className="rsIcon"> &#x20B9;</span>{summary.subtotal} </div>
          </div>
          <hr className="line" />
          <div className="orderTotalItem">
            <div className="orderTotalName">Discount </div>
            <div className="orderTotalPrice discount">- <span className="rsIcon"> &#x20B9;</span>{summary.discount}</div>
          </div>
          <hr className="line" />
          <div className="orderTotalItem">
            <div className="orderTotalName">Delivery Fee</div>
            <div className="orderTotalPrice"><span className="rsIcon"> &#x20B9;</span>{summary.deliveryFee}</div>
          </div>
          <hr className="line" />
          <div className="orderTotalItem">
            <div className="orderTotalName">Taxes </div>
            <div className="orderTotalPrice"><span className="rsIcon"> &#x20B9;</span>{summary.taxes}</div>
          </div>
          <hr className="line" />
          <div className="orderTotalItem total">
            <div className="orderTotalName">Total </div>
            <div className="orderTotalPrice"><span className="rsIconTotal"> &#x20B9;</span>{summary.total}</div>
          </div>
        </div>

        <div className="placeOrderBtn">
        {/* <NavLink to="/payment" ><button><Payment summary={summary} /></button></NavLink> */}
          
          {/* <button onClick={()=>setOrderConfirmation(true)}>PLACE ORDER</button> */}
          <button onClick={handlePayment}>PLACE ORDER</button>
        </div>

      </div>
    </div>
  );
};

export default OrderSummary;
