import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import CreateBook from "./CreateBook";

const ViewBook = () => {
  const [show, setShow] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [open, setOpen] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;

  const getBooks = async () => {
    const data = await axios.get(`${baseURL}/shop/view`);
    const sellerId = JSON.parse(localStorage.getItem("login_user_data")).data
      .id;
    const id = data.data.data.find((val) => {
      if (val.seller_id === sellerId) {
        return val;
      }
    });

    const response = await axios.get(`${baseURL}/book/view`);
    const finalList = response.data.data.filter((val) => {
      if (val.shop_id === id.id) {
        return val;
      }
    });
    setBookData(finalList);
  };

  useEffect(() => {
    getBooks();
  }, [open]);

  return (
    <>
      <div className="py-[100px]">
        <div className="max-w-[1500px] mx-auto w-full">
          <div className="flex justify-between items-center">
            <h4 className="py-[20px] text-[30px] text-[#4d4545] font-bold">
              Book List
            </h4>
            <button
              onClick={() => setOpen(true)}
              className="bg-green-500	text-white px-[30px] py-[7px] outline-none border-0 h-fit rounded-[5px]"
            >
              Create
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {bookData &&
              bookData.map((val) => (
                <div className="bg-white border-[#ccc] border-[1px] rounded-[8px] p-[20px]">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex gap-[10px]">
                      <span className="font-bold w-[100px]">Name: </span>
                      <span className="pl-[15px]">{val.name}</span>
                    </div>
                    <div className="flex gap-[10px]">
                      <span className="font-bold w-[100px]">Stock Count:</span>
                      <span>{val.stock_count}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <CreateBook setShow={setShow} setOpen={setOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ViewBook;
