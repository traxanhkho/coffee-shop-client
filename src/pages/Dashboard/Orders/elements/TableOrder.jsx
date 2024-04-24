import { Link } from "react-router-dom";
import useStore from "../../../../store";
import CategoryFilter from "../../../../components/CategoryFilter";
import { useEffect, useState } from "react";

const sortOptions = [
  { name: "Newest", href: "created_at", current: false },
  { name: "Oldest", href: "-created_at", current: false },
];

const TableOrder = ({ items }) => {
  const authenticatedUser = useStore((store) => store.authenticatedUser);
  const onDeleteProduct = useStore((store) => store.onDeleteProduct);
  const setProducts = useStore((store) => store.setProducts);
  const orderStatuses = useStore((store) => store.orderStatuses);

  const [sortOptions, setSortOptions] = useState([
    { name: "Newest", href: "created_at", current: false },
    { name: "Oldest", href: "-created_at", current: false },
  ]);

  const [filters, setFilters] = useState([
    {
      id: "status",
      name: "Status",
      options: [
        { value: 1, label: "cancelled", checked: false },
        { value: 2, label: "pedding", checked: false },
        { value: 3, label: "processing", checked: false },
        { value: 4, label: "completed", checked: false },
      ],
    },
  ]);

  const handleOnDeleteOrder = (productId) => {
    onDeleteProduct(productId);

    const update = items.filter((item) => item.id !== productId);

    setProducts([...update]);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            All orders
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
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
              <th className="py-3 pr-6">Id</th>
              <th className="py-3 pr-6">Customer Name</th>
              <th className="py-3 pr-6">Phone</th>
              <th className="py-3 pr-6">Address</th>
              <th className="py-3 pr-6">Status</th>
              <th className="py-3 pr-6">Days After Order</th>
              {authenticatedUser.user.roles[0].name == "Guest" ? (
                ""
              ) : (
                <th className="py-3 pr-6"></th>
              )}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {items.map((order, idx) => (
              <tr key={idx}>
                <td className="pr-6 py-4 ">
                  {authenticatedUser.user.roles[0].name == "Guest" ? (
                    <h4>{order.id}</h4>
                  ) : (
                    <p> {order.id}</p>
                  )}
                </td>
                <td className="pr-6 py-4 ">{order.user.name}</td>
                <td className="pr-6 py-4 ">
                  <p className="max-w-md">{order.number_phone}</p>
                </td>
                <td className="pr-6 py-4 ">
                  <p className="max-w-md">{order.address}</p>
                </td>
                <td className="pr-6 py-4 ">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      order.status == "Active"
                        ? "text-green-600 bg-green-50"
                        : "text-blue-600 bg-blue-50"
                    }`}
                  >
                    {order?.status[0]?.name}
                  </span>
                </td>
                <td className="pr-6 py-4 ">
                  {new Date(order.created_at).toLocaleString("en-GB")}
                </td>

                <td className="pr-6 py-4 ">
                  <Link
                    to={`/dashboard/orders/${order.id}/edit`}
                    className="py-1.5 px-3 text-gray-600 bg-blue-200 hover:text-white duration-150 hover:bg-blue-400 border rounded-lg"
                  >
                    Order Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
