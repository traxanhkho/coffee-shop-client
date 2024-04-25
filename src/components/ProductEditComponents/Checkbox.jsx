import React, { useEffect, useState } from "react";
import useStore from "../../store";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";

function Checkbox({ items, product }) {
  const setTypes = useStore((store) => store.setTypes);
  const getProductAttachTypeUrl = useStore(
    (store) => store.getProductAttachTypeUrl
  );
  const getProductDetachTypeUrl = useStore(
    (store) => store.getProductDetachTypeUrl
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const attach = async (typeId) => {
    axios.defaults.withCredentials = true;

    const access_token = sessionStorage.getItem("access_token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: access_token,
      },
    };

    const loading = toast.loading("Product attach category...", {
      position: toast.POSITION.TOP_RIGHT,
    });

    try {
      const formData = new FormData();

      formData.append("type_id", Number(typeId));
      // const response = await axios.post(
      //   `http://coffee-shop-server.test/products/${product.id}/attach?_method=PUT`,
      //   formData,
      //   config
      // );

      const response = await axios.post(
        `http://127.0.0.1:8000/products/${product.id}/attach?_method=PUT`,
        formData,
        config
      );

      if (response.data) {
        toast.update(loading, {
          render: `Message: Product attach category successfully.`,
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

      console.error("error attach types: ", error);
    }

    if (items) {
      const index = items.findIndex((item) => item.id === typeId);
      if (index !== -1) {
        // Create a copy of the types array
        const newTypes = [...items];
        // Add the isDetach property to the found item
        newTypes[index] = { ...newTypes[index], isAttach: true };
        console.log(newTypes);
        setTypes(newTypes);
        // Now `newTypes` contains the item with the isDetach property added
      } else {
        console.log(`Item with id ${typeId} not found`);
      }
    }
  };

  const detach = async (typeId) => {
    axios.defaults.withCredentials = true;

    const access_token = sessionStorage.getItem("access_token");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: access_token,
      },
    };

    const loading = toast.loading("Product attach category...", {
      position: toast.POSITION.TOP_RIGHT,
    });

    try {
      const formData = new FormData();

      formData.append("type_id", Number(typeId));
      // const response = await axios.post(
      //   `http://coffee-shop-server.test/products/${product.id}/detach?_method=PUT`,
      //   formData,
      //   config
      // );

      const response = await axios.post(
        `http://127.0.0.1:8000/products/${product.id}/detach?_method=PUT`,
        formData,
        config
      );

      if (response.data) {
        toast.update(loading, {
          render: `Message: Product detach category successfully.`,
          type: "warning",
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
        render: `Message Detach: an error has occurred`,
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        className: "custom-toast",
        theme: "light",
        hideProgressBar: true,
      });

      console.error("error attach types: ", error);
    }

    if (items) {
      const index = items.findIndex((item) => item.id === typeId);
      if (index !== -1) {
        // Create a copy of the types array
        const newTypes = [...items];
        // Add the isDetach property to the found item
        newTypes[index] = { ...newTypes[index], isAttach: false };
        console.log(`Detached item with id ${typeId}`);
        setTypes(newTypes);

        // Now `newTypes` contains the item with the isDetach property added
      } else {
        console.log(`Item with id ${typeId} not found`);
      }
    }
    console.log("detach: ", typeId);
  };

  useEffect(() => {
    if (items && product.types) {
      const newTypes = [...items];
      product.types.forEach((type) => {
        const index = items.findIndex((item) => item.id === type.id);
        if (index !== -1) {
          newTypes[index] = { ...newTypes[index], isAttach: true };
          // console.log(newTypes); :: không hiểu ở đây nè nó kì kì sao á @@
        }
      });
      setTypes(newTypes);
    }
  }, [product]);

  function resetTypes() {
    const typeReset = items.map((type) => ({ ...type, isAttach: false }));
    setTypes(typeReset);
  }
  useEffect(() => {
    return () => {
      resetTypes();
    };
  }, []);

  return (
    <div class="p-6 text-gray-900 dark:text-gray-100">
      <div class="bg-white overflow-auto">
        <table class="bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Options
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Id
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Attach
              </th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
                Detach
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            {items.map((item) => (
              <tr>
                <td class="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    name=""
                    className="w-6 label:bg-red-400 "
                    id=""
                    checked={item.isAttach}
                    disabled
                  />
                </td>
                <td class="text-left py-3 px-4">{item.id}</td>
                <td class="text-left py-3 px-4">{item.name}</td>

                <td class="text-left py-3 px-4">
                  <button
                    onClick={() => attach(item.id)}
                    disabled={item.isAttach ? true : false}
                    className={` disabled:opacity-70 disabled:text-white btn px-2 py-1  rounded-lg hover:text-[--primary] hover:opacity-70 bg-yellow-200`}
                  >
                    Attach
                  </button>
                </td>
                <td class="text-left py-3 px-4">
                  <button
                    disabled={item.isAttach ? false : true}
                    onClick={() => detach(item.id)}
                    className="disabled:opacity-70 disabled:text-white btn px-2 py-1 rounded-lg hover:text-[--primary]  hover:opacity-70 bg-red-200"
                  >
                    Detach
                  </button>
                </td>
              </tr>
            ))}

            {/* @endforeach */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Checkbox;
