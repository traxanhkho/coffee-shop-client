import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useStore from "../../../../store";

const placeholder = "../public/assets/costa-coffee-logo.svg";

function BasketOrder({ authenticatedUser , basketItems }) {

  const { orderId } = useParams();

  const getOrderById = useStore((store) => store.getOrderById);

  const itemsPrice = basketItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.product?.price * currentItem.quantity,
    0
  );

  

  let totalPrice = itemsPrice;
  if (authenticatedUser) totalPrice = itemsPrice * 0.95;
  totalPrice = totalPrice.toFixed(2);
  let totalPriceHeading = "Total Price";
  if (authenticatedUser) totalPriceHeading = "Total Price with 5% discount";

  return (
    <section className="block">
      <h2>Cart Items</h2>
      {basketItems.length === 0 && <div>Empty</div>}
      {basketItems.map((item) => (
        <div key={item.id} className="row">
          <div className="columns">
            <div className="columns">
              {item.product?.name.charAt(0).toUpperCase() +
                item.product?.name.slice(1)}
            </div>
            <h6>:</h6>
          </div>
          <div className="columns text-right">
            {item.quantity} x {item.product?.price.toFixed(2)}đ
          </div>
        </div>
      ))}
      {basketItems.length !== 0 && (
        <>
          <hr></hr>
          <div className="row">
            <div className="columns">
              <strong>{totalPriceHeading}</strong>
            </div>
            <div className="column-1 text-right">
              <strong>{totalPrice}đ</strong>
            </div>
          </div>
          <hr />
        </>
      )}
    </section>
  );
}

export default BasketOrder;
