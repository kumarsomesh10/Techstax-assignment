import React from 'react'
import "../styles/AlertPopUp.css"

const AlertPopUp = ({total,toggle}) => {
  return (
    <div className='alert'>
        <div className="alertContainer">
            <div className="alertTitle1">Order has been placed succesfully.</div>
            <div className="alertTitle2">Confirmation message sent!</div>
            <div className="alertDetails">
                <div className="alertOrderId"><span>Order ID : </span> {Math.floor(1000 + Math.random() * 9000)}</div>
                <div className="alertTotal"><span>Total : </span> <span className="rsIcon"> &#x20B9;</span>{total} </div>
            </div>
        </div>
        <div className="alertBtn">
            <button onClick={()=> toggle()}>Back</button>
        </div>
    </div>
  )
}

export default AlertPopUp