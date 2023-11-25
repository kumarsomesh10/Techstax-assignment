import React from 'react'
import "../styles/PopUp.css"

const PopUp = () => {
  return (
    <div className='popUpDetails'>
        <h2>TSX PIZZERIAS</h2>
        <div className="popUpButton">
            <button className='delivery'>DELIVERY</button>
            <button className='pickUp'>PICK UP</button>
        </div>
        <div className="popUpContainer">
            <div className="popUpRow">
                <div>25 min Dilevery</div>
                <div>10% Discounts </div>
            </div>
            <div className="popUpRow time">
                Menu Hours : 10:00 AM to 11:00 PM
            </div>
        </div>
    </div>
  )
}

export default PopUp