import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [validateName, setValidateName] = useState("name");
  const baseURL = process.env.REACT_APP_BASE_URL;

  const addShop = async () => {
    if (!validation()) {
      const id = JSON.parse(localStorage.getItem("login_user_data")).data.id;
      const body = {
        shop_name: data,
        seller_id: id,
      };

      const response = await axios.post(`${baseURL}/shop/add`, body);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    }
  };

  const validation = () => {
    let valid = false;
    if (data === "") {
      setValidateName(data);
      valid = true;
    }

    return valid;
  };

  return (
    <div className="py-[100px]">
      <div className="max-w-[500px] w-full border-[1px] border-[#ccc] mx-auto rounded-[8px] h-fit p-[20px]">
        <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold text-center">
          Add Shop
        </h4>
        <div className="flex flex-col gap-[5px]">
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => {
              setData(e.target.value);
              setValidateName(e.target.value);
            }}
            className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
            placeholder="Enter Shop Name"
          />
          {validateName === "" && (
            <p className="text-[red] tracking-[.5px] text-[12px]">
              Enter valid name
            </p>
          )}
        </div>
        <div className="mt-[25px]">
          <button
            onClick={addShop}
            className="bg-green-500	text-white px-[30px] py-[7px] outline-none border-0 rounded-[5px]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
