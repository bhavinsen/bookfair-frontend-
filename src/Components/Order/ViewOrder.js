import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [bookName, setBookName] = useState([]);
  const [buyerName, setBuyerName] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;

  const getOrders = async () => {
    const data = await axios.get(`${baseURL}/shop/view`);
    const sellerId = JSON.parse(localStorage.getItem("login_user_data")).data
      .id;
    const id = data.data.data.find((val) => {
      if (val.seller_id === sellerId) {
        return val;
      }
    });

    const response = await axios.get(`${baseURL}/order/view`);
    setOrderData(response.data.data);

    const bookData = await axios.get(`${baseURL}/book/view`);
    setBookName(bookData.data.data);

    const buyerData = await axios.get(`${baseURL}/buyer/view`);
    setBuyerName(buyerData.data.data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className="py-[100px]">
        <div className="max-w-[1500px] mx-auto w-full">
          <div className="flex justify-between items-center">
            <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold">
              Order List
            </h4>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {orderData.map((val) => (
              <div className="bg-white border-[#ccc] border-[1px] rounded-[8px] p-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Book Name: </span>
                    <span className="">
                      {bookName.map((value) => {
                        if (val.book_id === value.id) {
                          return value.name;
                        }
                      })}
                    </span>
                  </div>

                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Buyer Name:</span>
                    <span>
                      {buyerName.map((value) => {
                        if (val.buyer_id === value.bid) {
                          return value.buyer_name;
                        }
                      })}
                    </span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Count:</span>
                    <span>{val.count}</span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Order Name:</span>
                    <span>{val.name}</span>
                  </div>
                  <div className="flex gap-[10px]">
                    <span className="font-bold w-[100px]">Address:</span>
                    <span>{val.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
