 import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Tables from "../../../components/Tables/index";
import useStore from "../../../store";
import Pagination from "../../../components/Pagination";
import SearchInput from "../../../components/SearchInput";

export default function Products() {
  const fetchProducts = useStore((store) => store.fetchProducts);
  const products = useStore((store) => store.products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <SearchInput />

          <Tables items={products} />
          <Pagination />
        </div>
      </div>
    </main>
  );
}
