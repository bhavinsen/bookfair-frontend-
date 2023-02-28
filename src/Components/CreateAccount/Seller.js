import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Seller = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [validateName, setValidateName] = useState("name");
  const [validateEmail, setValidateEmail] = useState("email");
  const [validateRole, setValidateRole] = useState("role");

  const baseURL = process.env.REACT_APP_BASE_URL;

  const CreateAcoount = async () => {
    if (!validation()) {
      localStorage.setItem("role", data.role);
      if (data.role === "seller") {
        const response = await axios.post(`${baseURL}/seller/add`, {
          seller_name: data.name,
          email: data.email,
        });
        if (response.status === 200) {
          navigate("/shopMain");
        }
        localStorage.setItem("login_user_data", JSON.stringify(response.data));
      } else if (data.role === "buyer") {
        const response = await axios.post(`${baseURL}/buyer/add`, {
          buyer_name: data.name,
          email: data.email,
        });
        if (response.status === 200) {
          navigate("/buyer-dashboard");
        }
        localStorage.setItem("login_user_data", JSON.stringify(response.data));
      }
    }
  };

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const validation = () => {
    let valid = false;
    if (data.name === "") {
      setValidateName(data.name);
      valid = true;
    }
    if (regex.test(data.email) === false) {
      setValidateEmail("");
      valid = true;
    }
    if (data.role === "") {
      setValidateRole(data.role);
      valid = true;
    }
    return valid;
  };

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="max-w-[500px] w-full border-[1px] border-[#ccc] rounded-[8px] h-fit p-[20px]">
          <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold text-center">
            Create Account
          </h4>
          <div className="flex flex-col gap-[5px]">
            <label>Name</label>
            <input
              type="text"
              className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setValidateName(e.target.value);
              }}
              placeholder="Enter Your Name"
            />
            {validateName === "" && (
              <p className="text-[red] text-[12px] tracking-[.5px]">
                Enter valid name
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[5px] mt-[15px]">
            <label>Email</label>
            <input
              type="email"
              className="w-full px-[15px] outline-none py-[5px] border-[1px] border-[#ccc] rounded-[5px]"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setValidateEmail(e.target.value);
              }}
            />
            {((data.email !== "" && regex.test(data.email) === false) ||
              validateEmail === "") && (
              <p className="text-[red] text-[12px] tracking-[.5px]">
                Enter valid Email
              </p>
            )}
          </div>
          <div className="mt-[15px] flex flex-col gap-[5px]">
            <label>Select Role</label>
            <div className="pl-[10px] flex gap-[20px]">
              <div className="flex items-center">
                <input
                  name="notification-method"
                  type="radio"
                  checked={data.role === "seller"}
                  value="seller"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={(e) => {
                    setData({ ...data, role: e.target.value });
                    setValidateRole(e.target.value);
                  }}
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Seller
                </label>
              </div>
              <div className="flex items-center">
                <input
                  name="notification-method"
                  type="radio"
                  value="buyer"
                  checked={data.role === "buyer"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={(e) => {
                    setData({ ...data, role: e.target.value });
                    setValidateRole(e.target.value);
                  }}
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  Buyer
                </label>
              </div>
            </div>
            {validateRole === "" && (
              <p className="text-[red] text-[12px] tracking-[.5px]">
                plese Select role
              </p>
            )}
          </div>
          <div className="mt-[25px]">
            <button
              onClick={CreateAcoount}
              className="bg-green-500	text-white px-[30px] py-[7px] outline-none border-0 rounded-[5px]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Seller;
