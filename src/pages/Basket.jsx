import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useStore from "../store";
import axios from "axios";
import { toast } from "react-toastify";

const placeholder = "../public/assets/costa-coffee-logo.svg";

function Basket({ authenticatedUser }) {
  const onAdd = useStore((store) => store.addItemBasket);
  const onRemove = useStore((store) => store.removeItemBasket);
  const getImagePath = useStore((store) => store.getImagePath);
  const basketItems = useStore((store) => store.basketItems);
  const removeAllBasketItems = useStore((store) => store.removeAllBasketItems);
  const createOrderUrl = useStore((store) => store.createOrderUrl);

  const totalToPay = useStore((store) => store.totalToPay);

  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [asGuestClicked, setAsGuestClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  const history = useNavigate();

  const itemsPrice = basketItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.qnt,
    0
  );

  let totalPrice = itemsPrice;
  if (authenticatedUser) totalPrice = itemsPrice;
  totalPrice = totalPrice.toFixed(2);
  let totalPriceHeading = "Total Price";
  if (authenticatedUser) totalPriceHeading = "Total Price :";

  const handlePayment = async () => {
    if (basketItems.length !== 0) {
      axios.defaults.withCredentials = true;

      const access_token = sessionStorage.getItem("access_token");
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: access_token,
        },
      };

      const loading = toast.loading("Creating a new product...", {
        position: toast.POSITION.TOP_RIGHT,
      });

      try {
        const response = await axios.post(
          createOrderUrl,
          { basketItems: JSON.stringify(basketItems) },
          config
        );

        if (response.data) {
          // redirect("/dashboard/products");
          removeAllBasketItems();

          toast.update(loading, {
            render: `Message: Order successfully.`,
            type: "success",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2400,
            className: "custom-toast",
            theme: "light",
            hideProgressBar: true,
          });

          console.log(response.data);

          history("/paymentReceived");
        }
      } catch (error) {
        toast.update(loading, {
          render: `Message: an error has occurred`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          className: "custom-toast",
          theme: "light",
          hideProgressBar: true,
        });

        console.error("error basket: ", error);
      }
    } else console.log("basket Items is empty");
  };

  return (
    <section className="block">
      <h2>Cart Items</h2>
      {basketItems.length === 0 && <div>Empty</div>}
      {basketItems.map((item) => (
        <div key={item.id} className="row">
          <div className="columns">
            <button
              onClick={() => onRemove(item)}
              className="rounded-md  h-8 w-8 flex items-center justify-center pb-1 center hover:bg-[--primary-transparent] hover:text-white remove-btn"
            >
              -
            </button>

            <div className="columns">
              {
                <img
                  className="image smallImage"
                  src={
                    item?.images
                      ? getImagePath(item.images[0]?.path)
                      : placeholder
                  }
                  alt={item.name}
                />
              }
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </div>
            <button
              onClick={() => onAdd(item)}
              className="rounded-md  h-8 w-8 flex items-center justify-center pb-1 hover:bg-[--primary-transparent] hover:text-white center add-btn"
            >
              +
            </button>
          </div>
          <div className="columns text-right">
            {item.qnt} x {item.price.toFixed(2)}đ
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
          <div className="row">
            {authenticatedUser && (
              <button
                // onClick={() => {
                //   history.push("/paymentReceived");
                //   removeAllBasketItems();
                // }}
                onClick={() => handlePayment()}
                className="square"
              >
                Pay
              </button>
            )}
            {!authenticatedUser && !checkoutClicked && (
              <button
                className="checkout-btn "
                onClick={() => setCheckoutClicked(!checkoutClicked)}
              >
                Checkout
              </button>
            )}
            {checkoutClicked ? (
              <>
                <div className="checkoutGridWrapper">
                  <div>
                    if you Login/Register you'll get 5% discount on all your
                    orders!
                  </div>
                  <br></br>
                  <div className="wrapperCheckout">
                    {!asGuestClicked && (
                      <>
                        <button
                          onClick={() => setAsGuestClicked(!asGuestClicked)}
                          className="square"
                        >
                          Checkout <br></br> as a <br></br> Guest
                        </button>
                        <button
                          onClick={() => history.push("/login")}
                          className="square"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => history.push("/signup")}
                          className="square"
                        >
                          Register
                        </button>
                      </>
                    )}
                    {asGuestClicked && (
                      <button
                        onClick={() => {
                          history.push("/paymentReceived");
                          removeAllBasketItems();
                        }}
                        className="square"
                      >
                        Pay
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Basket;
