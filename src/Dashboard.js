import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewBook from "./Components/Books/ViewBook";
import ViewOrder from "./Components/Order/ViewOrder";

const Dashboard = () => {
  const [menu, setMenu] = useState("book");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const getName = () => {
    const nameJson = localStorage.getItem("login_user_data");
    setName(JSON.parse(nameJson).data.seller_name);

    const role = localStorage.getItem("role");
    setRole(role);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <div className="p-[15px] bg-[#eee]">
        <div className="max-w-[1500px] w-full mx-auto flex items-center justify-between">
          <h4 className="text-[25px] font-medium">Seller Dashboard</h4>
          <div className="flex gap-[55px]">
            <h3
              onClick={() => setMenu("book")}
              className="cursor-pointer border-b-[2px] transition-all border-[transparent] hover:border-[#393939]"
            >
              Books
            </h3>
            <h3
              onClick={() => setMenu("order")}
              className="cursor-pointer border-b-[2px] transition-all border-[transparent] hover:border-[#393939]"
            >
              Order
            </h3>
          </div>
          <div>
            <Menu placement="bottom-end">
              <MenuHandler>
                <div className="flex flex-col items-end cursor-pointer">
                  <span className="font-medium">{name}</span>
                  <span>{role}</span>
                </div>
              </MenuHandler>
              <MenuList className="p-0 min-w-[130px]">
                <MenuItem className="py-[0]" onClick={() => navigate("/")}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      <div>
        {menu === "book" && <ViewBook />}
        {menu === "order" && <ViewOrder />}
      </div>
    </div>
  );
};

export default Dashboard;
