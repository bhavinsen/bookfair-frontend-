import { Menu, MenuHandler } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CreateShop from "./Components/Shop/CreateShop";

const ShopMain = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

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
          <div>
            <Menu placement="bottom-end">
              <MenuHandler>
                <div className="flex flex-col items-end cursor-pointer">
                  <span className="font-medium">{name}</span>
                  <span>{role}</span>
                </div>
              </MenuHandler>
            </Menu>
          </div>
        </div>
      </div>
      <div>
        <CreateShop />
      </div>
    </div>
  );
};

export default ShopMain;
