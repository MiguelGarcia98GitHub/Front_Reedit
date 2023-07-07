import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const HeaderMenuNotLogged = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-5 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BurgerMenuIcon className="h-7 w-7" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-75"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <SignInIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    ) : (
                      <SignInIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    )}
                    Log In
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    {active ? (
                      <RegisterIcon
                        className="mr-2 h-7 w-7"
                        aria-hidden="true"
                      />
                    ) : (
                      <RegisterIcon
                        className="mr-2 h-7 w-7"
                        aria-hidden="true"
                      />
                    )}
                    Register
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

function BurgerMenuIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 6H17M3 10H17M3 14H17" stroke="#FCD34D" strokeWidth="2" />
    </svg>
  );
}

function SignInIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H15M10 15L15 10L10 5"
        fill="#F59E0B"
        stroke="#FCD34D"
        strokeWidth="2"
      />
    </svg>
  );
}

function RegisterIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 5V15M5 10H15"
        fill="#F59E0B"
        stroke="#FCD34D"
        strokeWidth="2"
      />
    </svg>
  );
}

export default HeaderMenuNotLogged;
