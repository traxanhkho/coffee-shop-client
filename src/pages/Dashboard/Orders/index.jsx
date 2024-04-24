import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import useStore from "../../../store";
import TableOrder from "./elements/TableOrder";
import SearchInput from "../../../components/SearchInput";
import PaginationOrder from "./elements/PaginationOrder";

export default function Orders() {
  const fetchOrders = useStore((store) => store.fetchOrders);
  const fetchOrderStatuses = useStore((store) => store.fetchOrderStatuses);
  const orders = useStore((store) => store.orders);

  useEffect(() => {
    fetchOrders();
    fetchOrderStatuses();
    console.log(orders);
  }, []);

  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          {/* table section start */}
          {/* <SearchInput /> */}
          <TableOrder items={orders} />

          {/* table section end */}

          <PaginationOrder />
        </div>
      </div>
    </main>
  );
}
