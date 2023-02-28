import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateBook = ({ setShow, setOpen }) => {
  const [data, setData] = useState({ name: "", count: 0 });
  const [shopId, setShopId] = useState();
  const [validateName, setValidateName] = useState("name");
  const [validateQty, setValidateQty] = useState("qty");
  const baseURL = process.env.REACT_APP_BASE_URL;

  const addBook = async () => {
    if (!validation()) {
      const body = {
        name: data.name,
        stock_count: data.count,
        shop_id: shopId,
      };

      const response = await axios.post(`${baseURL}/book/add`, body);
      if (response.status === 200) {
        setOpen(false);
      }
    }
  };

  const validation = () => {
    let valid = false;

    if (data.name === "") {
      setValidateName(data.name);
      valid = true;
    }
    if (data.count === 0) {
      setValidateQty(data.count);
      valid = true;
    }
    return valid;
  };

  const getShopId = async () => {
    const data = await axios.get(`${baseURL}/shop/view`);
    const sellerId = JSON.parse(localStorage.getItem("login_user_data")).data
      .id;
    const id = data.data.data.find((val) => {
      if (val.seller_id === sellerId) {
        return val;
      }
    });
    setShopId(id.id);
  };

  useEffect(() => {
    getShopId();
  }, []);

  return (
    <div className="max-w-full w-full border-[1px] border-[#ccc] rounded-[8px] h-fit p-[20px]">
      <div className="flex flex-col gap-[5px]">
        <label>Name</label>
        <input
          type="text"
          className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
          placeholder="Enter Book Name"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
            setValidateName(e.target.value);
          }}
        />
        {validateName === "" && (
          <p className="text-[red] tracking-[.5px] text-[12px]">
            Enter valid name
          </p>
        )}
      </div>
      <div className="flex flex-col gap-[5px] mt-[15px]">
        <label>Stock Count</label>
        <input
          type="number"
          className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
          placeholder="Enter Stock Count"
          onChange={(e) => {
            setData({ ...data, count: e.target.value });
            setValidateQty(e.target.value);
          }}
        />
        {Number(validateQty) === 0 && (
          <p className="text-[red] tracking-[.5px] text-[12px]">
            Enter valid Count
          </p>
        )}
      </div>
      <div className="mt-[25px]">
        <button
          onClick={addBook}
          className="bg-green-500	text-white px-[30px] py-[7px] outline-none border-0 rounded-[5px]"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
