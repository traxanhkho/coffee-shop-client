import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store";
import CategoryFilter from "../CategoryFilter";

const placeholder = "../public/assets/costa-coffee-logo.svg";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
];

const Tables = ({ items }) => {
  const getImagePath = useStore((store) => store.getImagePath);
  const authenticatedUser = useStore((store) => store.authenticatedUser);
  const onDeleteProduct = useStore((store) => store.onDeleteProduct);
  const setProducts = useStore((store) => store.setProducts);

  const [sortOptions, setSortOptions] = useState([
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
  ]);
  const [filters, setFilters] = useState([
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "All New Arrivals", checked: false },
        { value: "tees", label: "Tees", checked: false },
        { value: "objects", label: "Objects", checked: false },
      ],
    },
  ]);

  const handleOnDeleteProduct = (productId) => {
    onDeleteProduct(productId);

    const update = items.filter((item) => item.id !== productId);

    setProducts([...update]);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All products
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          {authenticatedUser.user.roles[0].name == "Guest" ? (
            ""
          ) : (
            <Link
              to="/dashboard/products/create"
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Add product
            </Link>
          )}
        </div>
      </div>
      {/* <CategoryFilter
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
        filters={filters}
        setFilters={setFilters}
      /> */}

      <div className="mt-12 relative h-max overflow-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 pr-6">Name</th>
              <th className="py-3 pr-6">Categories</th>
              <th className="py-3 pr-6">Description</th>
              <th className="py-3 pr-6">Image</th>
              <th className="py-3 pr-6">Price</th>
              <th className="py-3 pr-6">Create At</th>
              {authenticatedUser.user.roles[0].name == "Guest" ? (
                ""
              ) : (
                <th className="py-3 pr-6"></th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {items.map((product, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 ">
                  {authenticatedUser.user.roles[0].name == "Guest" ? (
                    <h4>{product.name}</h4>
                  ) : (
                    <Link
                      to={`/dashboard/products/${product.id}/edit`}
                      className="text-blue-600 underline"
                    >
                      {product.name}
                    </Link>
                  )}
                </td>
                <td className="pr-6 py-4 ">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      product.status == "Active"
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {product.types[0]?.name}
                  </span>
                </td>
                <td className="pr-6 py-4 ">
                  <p className="max-w-md">{product.description}</p>
                </td>
                <td className="pr-6 py-4 ">
                  <img
                    src={
                      product?.images
                        ? getImagePath(product.images[0]?.path)
                        : placeholder
                    }
                    className="h-[40px] object-fit"
                  />
                </td>
                <td className="pr-6 py-4 ">{product.price}đ</td>
                <td className="pr-6 py-4 ">
                  {new Date(product.created_at).toLocaleString("en-GB")}
                </td>
                {authenticatedUser.user.roles[0].name == "Guest" ? (
                  ""
                ) : (
                  <td className="text-right ">
                    <button
                      onClick={() => handleOnDeleteProduct(product.id)}
                      className="py-1.5 px-3 text-gray-600 bg-red-200 hover:text-white duration-150 hover:bg-red-400 border rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
