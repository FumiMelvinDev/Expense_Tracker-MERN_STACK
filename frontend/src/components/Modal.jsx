import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";

function Modal({ open, close, children }) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={close}
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full p-4 text-center my-10 py-2 max-w-3xl px-6 mx-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full py-2 px-6 mx-auto">
                <div className="bg-white pb-4 pt-5 py-2 px-6">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      className="flex text-2xl px-3 pb-2 text-teal-900 text:bg-gray-50"
                      onClick={() => close(false)}
                      ref={cancelButtonRef}
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
