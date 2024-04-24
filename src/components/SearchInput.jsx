import React from "react";

function SearchInput(props) {
  return (
    <div>
      <form className="text-center">
        <input
          type="text"
          className="h-12 w-96 rounded-3xl border-solid border-[lightgrey] p-3 outline-none weight-[600]"
          name="search"
          placeholder="Search here..."
        ></input>
      </form>
    </div>
  );
}

export default SearchInput;
