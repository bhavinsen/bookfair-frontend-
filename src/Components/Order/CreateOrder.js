import { Option, Select } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateOrder = ({ setMenu }) => {
  const [shopData, setShopData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [data, setData] = useState({
    shopId: "",
    bookId: "",
    name: "",
    qty: 0,
    address: "",
  });
  const [validateShopId, setValidateShopId] = useState("shop");
  const [validateBookId, setValidateBookId] = useState("book");
  const [validateName, setValidateName] = useState("name");
  const [validateQty, setValidateQty] = useState("qty");
  const [validateAddress, setValidateAddress] = useState("add");

  const baseURL = process.env.REACT_APP_BASE_URL;

  const getShop = async () => {
    const data = await axios.get(`${baseURL}/shop/view`);
    setShopData(data.data.data);
  };

  const getBook = async (id) => {
    const bookData = await axios.get(`${baseURL}/book/view`);
    const finalList = bookData.data.data.filter((val) => val.shop_id === id);
    setBookData(finalList);
    setData({ ...data, shopId: id });
    setValidateShopId(id);
  };

  useEffect(() => {
    getShop();
  }, []);

  const handelOnclick = async () => {
    if (!validation()) {
      const userId = JSON.parse(localStorage.getItem("login_user_data")).data
        .bid;
      const body = {
        address: data.address,
        book_id: data.bookId,
        buyer_id: userId,
        count: data.qty,
        name: data.name,
        shop_id: data.shopId,
      };

      const response = await axios.post(`${baseURL}/order/add`, body);
      if (response.status === 200) {
        alert("Your order is placed successfully");
        setMenu("shop");
      }
    }
  };

  const validation = () => {
    let valid = false;
    if (data.shopId === "") {
      setValidateShopId(data.shopId);
      valid = true;
    }
    if (data.bookId === "") {
      setValidateBookId(data.bookId);
      valid = true;
    }
    if (data.name === "") {
      setValidateName(data.name);
      valid = true;
    }
    if (data.qty === 0) {
      setValidateQty(data.qty);
      valid = true;
    }
    if (data.address === "") {
      setValidateAddress(data.address);
      valid = true;
    }

    return valid;
  };

  return (
    <div className="py-[100px]">
      <div className="max-w-[500px] w-full border-[1px] border-[#ccc] mx-auto rounded-[8px] h-fit p-[20px]">
        <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold text-center">
          Place Order
        </h4>
        <div className="flex flex-col gap-[5px]">
          <label>Select Shop</label>
          <div className="w-full">
            <Select label="Select Shop" onChange={(e) => getBook(e)}>
              {shopData.map((val) => (
                <Option value={val.id}>{val.shop_name}</Option>
              ))}
            </Select>
            {validateShopId === "" && (
              <p className="text-[red] tracking-[.5px] text-[12px]">
                Enter valid shop
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[5px] mt-[15px]">
          <label>Select Book</label>
          <div className="w-full">
            <Select
              label="Select Book"
              onChange={(e) => {
                setData({ ...data, bookId: e });
                setValidateBookId(e);
              }}
            >
              {bookData.map((val) => (
                <Option value={val.id}>{val.name}</Option>
              ))}
            </Select>
            {validateBookId === "" && (
              <p className="text-[red] tracking-[.5px] text-[12px]">
                Enter valid Book
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[5px] mt-[15px]">
          <label>Buyer Name</label>
          <input
            type="Text"
            value={data.name}
            className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
            placeholder="Enter Buyer Name"
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
          <label>Quantity</label>
          <input
            type="number"
            value={data.qty}
            className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
            placeholder="Enter Quantity"
            onChange={(e) => {
              setData({ ...data, qty: e.target.value });
              setValidateQty(e.target.value);
            }}
          />
          {Number(validateQty) === 0 && (
            <p className="text-[red] tracking-[.5px] text-[12px]">
              Enter valid Quantity
            </p>
          )}
        </div>
        <div className="mt-[15px]">
          <label>Address</label>
          <div className="mt-1">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              value={data.address}
              className="block w-full rounded-md border-[1px] border-[#ccc] text-[17px] outline-none p-[15px]"
              placeholder={"Enter Buyer Address"}
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
                setValidateAddress(e.target.value);
              }}
            />
            {validateAddress === "" && (
              <p className="text-[red] tracking-[.5px] text-[12px]">
                Enter valid Address
              </p>
            )}
          </div>
        </div>
        <div className="mt-[25px]">
          <button
            onClick={handelOnclick}
            className="bg-green-500	text-white px-[30px] py-[7px] outline-none border-0 rounded-[5px]"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
