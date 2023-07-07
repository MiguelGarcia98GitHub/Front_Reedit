import "./Modal.css";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Confetti from "react-confetti";

interface ModalProps {
  title: string;
  content: string;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  isModalOpen,
  setIsModalOpen,
}) => {
  useEffect(() => {
    let timer: number | undefined;
    if (isModalOpen) {
      timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2200);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isModalOpen, setIsModalOpen]);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${
                  title === "Success"
                    ? "successBorder"
                    : title === "Error"
                    ? "errorBorder"
                    : ""
                }`}
              >
                {title === "Success" && (
                  <Confetti className="absolute inset-0" />
                )}{" "}
                <Dialog.Title
                  as="h3"
                  className={`text-xl font-medium leading-6 ${
                    title === "Success"
                      ? "text-green-600"
                      : title === "Error"
                      ? "text-red-700"
                      : "text-gray-900"
                  }`}
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-base text-gray-500">{content}</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
