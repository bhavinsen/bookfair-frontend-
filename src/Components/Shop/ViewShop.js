import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateShop from "./CreateShop";

const ViewShop = () => {
  const [shopData, setShopData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  console.log(baseURL);
  const getName = async () => {
    const data = await axios.get(`${baseURL}/shop/view`);
    setShopData(data.data.data);
  };

  useEffect(() => {
    getName();
  }, []);

  const getBookList = async (value) => {
    const response = await axios.get(`${baseURL}/book/view`);
    const finalList = response.data.data.filter((val) => {
      if (val.shop_id === value.id) {
        setId(val.shop_id);
        return val;
      }
    });
    setShow(!show);
    setBookData(finalList);
  };

  return (
    <>
      <div className="py-[100px]">
        <div className="max-w-[1500px] mx-auto w-full">
          <div className="flex justify-between items-center">
            <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold">
              Shop List
            </h4>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {shopData.map((val) => (
              <div
                onClick={() => getBookList(val)}
                className="bg-white border-[#ccc] border-[1px] rounded-[8px] p-[20px] h-fit"
              >
                <div className="flex flex-col gap-[10px]">
                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Shop Name: </span>
                    <span className="pl-[15px]">{val.shop_name}</span>
                  </div>
                </div>

                {id === val.id && show && (
                  <h1 className="font-bold text-[18px] underline my-2">
                    Book list
                  </h1>
                )}
                {bookData &&
                  show &&
                  id === val.id &&
                  bookData.map((book) => (
                    <div className="flex flex-col ">
                      <div className="flex gap-[10px]">
                        <span className="font-bold w-[100px]">Book Name: </span>
                        <span className="pl-[15px]">{book.name}</span>
                      </div>
                      <div className="flex gap-[10px]">
                        <span className="font-bold w-[100px]">
                          Stock count:{" "}
                        </span>
                        <span className="pl-[15px]">{book.stock_count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewShop;
