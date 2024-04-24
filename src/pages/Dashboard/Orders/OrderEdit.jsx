import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useForm } from "react-hook-form";
import Checkbox from "../../../components/ProductEditComponents/Checkbox";
import useStore from "../../../store";
import axios from "axios";
import { toast } from "react-toastify";
import Basket from "./elements/BasketOrder";
import BasketOrder from "./elements/BasketOrder";

const createDeliveryInfo = (name, address, phone) => ({
  name,
  address,
  phone,
});

function OrderEdit() {
  const types = useStore((store) => store.types);
  const fetchTypes = useStore((store) => store.fetchTypes);
  const getUpdateProductUrl = useStore((store) => store.getUpdateProductUrl);
  const getProductById = useStore((store) => store.getProductById);
  const getOrderById = useStore((store) => store.getOrderById);
  const getImagePath = useStore((store) => store.getImagePath);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
  });
  const [basketItems, setBasketItems] = useState([]);
  const [deliveryInformation, setDeliveryInformation] = useState({
    name: "Tien Dat",
    address: "Nha Trang - Khanh Hoa",
    phone: "0367219606",
  });

  const [productEdit, setProductEdit] = useState({});
  const [localImage, setLocalImage] = useState(null);
  const { productId, orderId } = useParams();

  const redirect = useNavigate();

  const {
    setValue,
    formState: { errors },
  } = useForm();

  const handleDisplayProductData = async () => {
    try {
      const data = await getProductById(productId);
      console.log(data);
      setProductEdit({ ...data });

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);

      // setLocalImage(getImagePath(data.images[0].path));
    } catch (error) {
      console.error("handle display product data error log :", error);
    }
  };

  useEffect(() => {
    handleDisplayProductData();
    fetchTypes();

    getOrderItems();
  }, []);

  const getOrderItems = async () => {
    try {
      const orderItems = await getOrderById(orderId);
      console.log("order items : ", orderItems);
      if (orderItems) {
        setBasketItems([...orderItems.items]);
        const { name, address, number_phone } = orderItems.user;
        setDeliveryInformation(createDeliveryInfo(name, address, number_phone));
      }
    } catch (error) {
      console.error("getOrderItemsById error log :", error);
    }
  };

  return (
    <main>
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex-1 flex">
          <div>
            <BasketOrder basketItems={basketItems} />
          </div>
          <div>
            <section className="block">
              <h2>Delivery Information:</h2>
              <hr></hr>
              <div className="row">
                <div className="columns">
                  <strong className="text-xl">Customer Name: </strong>
                </div>
                <div className="column-1 text-right">
                  <strong className="text-xl">{deliveryInformation.name}</strong>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <strong className="text-xl">Address: </strong>
                </div>
                <div className="column-1 text-right">
                  <strong className="text-xl">{deliveryInformation.address}</strong>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <strong className="text-xl">Number Phone: </strong>
                </div>
                <div className="column-1 text-right">
                  <strong className="text-xl">+{deliveryInformation.phone}</strong>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderEdit;
