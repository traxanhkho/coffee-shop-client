import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import { useForm } from "react-hook-form";
import Checkbox from "../../../components/ProductEditComponents/Checkbox";
import useStore from "../../../store";
import axios from "axios";
import { toast } from "react-toastify";

function ProductEdit() {
  const types = useStore((store) => store.types);
  const fetchTypes = useStore((store) => store.fetchTypes);
  const getUpdateProductUrl = useStore((store) => store.getUpdateProductUrl);
  const getProductById = useStore((store) => store.getProductById);
  const getImagePath = useStore((store) => store.getImagePath);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
  });
  const [productEdit, setProductEdit] = useState({});
  const [localImage, setLocalImage] = useState(null);
  const { productId } = useParams();

  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleDisplayProductData = async () => {
    try {
      const data = await getProductById(productId);
      console.log(data);
      setProductEdit({ ...data });

      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);

      setLocalImage(getImagePath(data.images[0].path));
    } catch (error) {
      console.error("handle display product data error log :", error);
    }
  };

  function handleFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      setLocalImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    handleDisplayProductData();
    fetchTypes();
  }, []);

  const onFormSubmit = async (data) => {
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
      const updateProduct = new FormData();

      updateProduct.append("name", data.name);
      updateProduct.append("description", data.description);
      updateProduct.append("price", data.price);

      if (data.picture.length !== 0) {
        // Update the formData object

        updateProduct.append("image", data.picture[0], data.picture[0].name);
      }

      const response = await axios.post(
        getUpdateProductUrl(productEdit.id),
        updateProduct,
        config
      );

      if (response.data) {
        redirect("/dashboard/products");

        toast.update(loading, {
          render: `Message: Create a new Product successfully.`,
          type: "success",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2400,
          className: "custom-toast",
          theme: "light",
          hideProgressBar: true,
        });

        console.log(response.data);
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

      console.error("error product update: ", error);
    }
  };

  return (
    <main>
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex-1">
          <div className="flex">
            <div>
              <h2 className="center space-down">Product Data:</h2>

              <form
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit(onFormSubmit)}
              >
                <div
                  className={
                    errors?.name
                      ? "hasError container-input"
                      : "container-input"
                  }
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="inline-block text-neutral-700 "
                    >
                      Product name:
                    </label>

                    <input
                      type="text"
                      placeholder="Product name"
                      {...register("name", {
                        required: "Name is required.",
                        minLength: {
                          value: 8,
                          message:
                            "Product name must have at least 8 characters",
                        },
                        value: product.name,
                        onChange: handleChange,
                      })}
                    />
                    <small className="text-danger">
                      {errors?.name && errors.name.message}
                    </small>
                  </div>
                </div>
                <div
                  className={
                    errors?.description
                      ? "hasError container-input"
                      : "container-input"
                  }
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="description"
                      className="inline-block text-neutral-700 "
                    >
                      Product Description:
                    </label>

                    <textarea
                      rows={3}
                      {...register("description", {
                        required: "Product description is required.",
                        minLength: {
                          value: 16,
                          message:
                            "Product description must have at least 16 characters",
                        },
                        maxLength: {
                          value: 240,
                          message:
                            "Product description must be between 16 and 240 characters long.",
                        },
                        value: product.description,
                        onChange: handleChange,
                      })}
                      placeholder="Product description"
                    />
                    <small className="text-danger">
                      {errors?.description && errors.description.message}
                    </small>
                  </div>
                </div>
                <div
                  className={
                    errors?.price
                      ? "hasError container-input"
                      : "container-input"
                  }
                >
                  <div className="flex flex-col relative">
                    <label
                      htmlFor=""
                      className="inline-block text-neutral-700 "
                    >
                      Product price:
                    </label>
                    <input
                      type="number"
                      placeholder="Product price"
                      {...register("price", {
                        required: "Product price is required.",
                        value: product.price,
                        onChange: handleChange,
                      })}
                    />
                    <span className="absolute bottom-3 left-[360px]">VND</span>
                    <small className="text-danger">
                      {errors?.price && errors.price.message}
                    </small>
                  </div>
                </div>

                {localImage && (
                  <img src={localImage} alt="product image" className="h-40" />
                )}

                <div
                  className={
                    errors?.picture
                      ? "hasError container-input"
                      : "container-input"
                  }
                >
                  <div className="flex flex-col">
                    <label
                      htmlFor="picture"
                      className="inline-block text-neutral-700 "
                    >
                      Product upload file image:
                    </label>
                    <input
                      accept="image/*"
                      className="relative m-0 w-[400px] h-[50px] min-w-0  rounded-5 border border-solid border-neutral-300 px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out"
                      type="file"
                      {...register("picture", {
                        onChange: handleFileChange,
                      })}
                      id="picture"
                    />
                    <small className="text-danger">
                      {errors?.picture && errors.picture.message}
                    </small>
                  </div>
                </div>

                <button className="button">Save</button>
              </form>
            </div>

            <div className="flex-1">
              <Checkbox items={types} product={productEdit} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductEdit;
