import { Home } from "@mui/icons-material";
import React from "react";
function Sides({ name, active, Icons }) {
  return (
    <div className={`mt-1 flex  w-[fit-content] items-center cursor-pointer p-3 hover:bg-[rgba(0,32,233,0.15)] rounded-full transiftion transform duration-150 ease-out ${active?"text-[#1D9BF0]":"text-[#E7E9EA]"}`}>
      {Icons}
      <p
        className={` hidden sm:block text-2xl font-extrabold ml-3 ${
          active ? "text-[#1D9BF0]" : "text-[#E7E9EA]"
        }`}
      >
        {name}
      </p>
    </div>
  );
}
export default Sides;