import React, { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store";

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const getProductPaginationUrl = useStore(
    (store) => store.getProductPaginationUrl
  );
  const setProducts = useStore((store) => store.setProducts);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      const { data } = await axios.get(getProductPaginationUrl(currentPage));

      const totalPages = Math.ceil(data.totals.total / 6) || 0;

      setTotalPages(totalPages);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching pagination data:", error);
    }
  };

  return (
    <div className="flex justify-between px-9 my-4">
      <button
        disabled={parseInt(currentPage) - 1 < 1 ? true : false}
        className={`disabled:opacity-70 disabled:hover:bg-yellow-400 disabled:cursor-not-allowed disabled:text-white  btn text-gray-600 px-2 py-1  rounded-lg hover:text-[--primary] hover:bg-yellow-200 bg-yellow-400`}
        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
      >
        Previous Page
      </button>
      <button
        disabled={parseInt(currentPage) + 1 > totalPages ? true : false}
        className="disabled:opacity-70 disabled:hover:bg-yellow-400 disabled:cursor-not-allowed disabled:text-gray-200 btn px-2 py-1 text-gray-600 rounded-lg hover:text-[--primary] hover:bg-yellow-200 bg-yellow-400"
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
