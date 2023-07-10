import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useStore } from "../../store/zustandStore";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { DecodedJWT, loggedIn } from "../../interfaces/interfaces";

const HeaderMenuLogged = () => {
  const { logged } = useStore();
  const navigate = useNavigate();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex-col w-full justify-center rounded-md bg-black bg-opacity-20 px-5 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center justify-center">
              <UserIcon className="h-7 w-7" aria-hidden="true" />
            </div>
            <div>
              <span>
                {logged &&
                  (jwt_decode(logged.access_token) as DecodedJWT).username}{" "}
              </span>
            </div>
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
          <Menu.Items className="absolute right-0 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      navigate("/explore-communities");
                    }}
                  >
                    {active ? (
                      <SignInIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    ) : (
                      <SignInIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    )}
                    Explore communities
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                    onClick={() => {
                      navigate("/create-community");
                    }}
                  >
                    {active ? (
                      <PlusIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    )}
                    Create a Community
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-orange-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                    onClick={() => {
                      navigate("/create-post");
                    }}
                  >
                    {active ? (
                      <PlusIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="mr-2 h-7 w-7" aria-hidden="true" />
                    )}
                    Create New Post
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

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C13.6569 2 15 3.34315 15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2ZM12 10C15.3137 10 18 12.6863 18 16V18H6V16C6 12.6863 8.68629 10 12 10Z"
        stroke="#FCD34D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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

function SignInIcon(props: React.SVGProps<SVGSVGElement>) {
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

export default HeaderMenuLogged;
