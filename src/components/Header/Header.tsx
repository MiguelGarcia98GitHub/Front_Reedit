// import { Menu, Transition } from "@headlessui/react";
// import { Fragment, useEffect, useRef, useState } from "react";

import { HeaderMenuLogged, HeaderMenuNotLogged } from "..";
import { useStore } from "../../store/zustandStore";

// export default function Header() {
//   return (
//     <div className="flex justify-between bg-orange-400 p-3 ">
//       <div className="flex items-center justify-center font-bold text-2xl font-logotext">
//         Reedit
//       </div>
//       <div>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
//               Options
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-75"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="absolute right-0 mt-1 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="px-1 py-1 ">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-orange-400 text-white" : "text-gray-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       {active ? (
//                         <EditActiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       ) : (
//                         <EditInactiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       )}
//                       Edit
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-orange-400 text-white" : "text-gray-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       {active ? (
//                         <DuplicateActiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       ) : (
//                         <DuplicateInactiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       )}
//                       Duplicate
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//               <div className="px-1 py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-orange-400 text-white" : "text-gray-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       {active ? (
//                         <ArchiveActiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       ) : (
//                         <ArchiveInactiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       )}
//                       Archive
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-orange-400 text-white" : "text-gray-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       {active ? (
//                         <MoveActiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       ) : (
//                         <MoveInactiveIcon
//                           className="mr-2 h-5 w-5"
//                           aria-hidden="true"
//                         />
//                       )}
//                       Move
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//               <div className="px-1 py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       className={`${
//                         active ? "bg-orange-400 text-white" : "text-gray-900"
//                       } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                     >
//                       {active ? (
//                         <DeleteActiveIcon
//                           className="mr-2 h-5 w-5 text-orange-700"
//                           aria-hidden="true"
//                         />
//                       ) : (
//                         <DeleteInactiveIcon
//                           className="mr-2 h-5 w-5 text-orange-700"
//                           aria-hidden="true"
//                         />
//                       )}
//                       Delete
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>
//     </div>
//   );
// }

// function EditInactiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function EditActiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 13V16H7L16 7L13 4L4 13Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function DuplicateInactiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 4H12V12H4V4Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//       <path
//         d="M8 8H16V16H8V8Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function DuplicateActiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M4 4H12V12H4V4Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//       <path
//         d="M8 8H16V16H8V8Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function ArchiveInactiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="8"
//         width="10"
//         height="8"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//       <rect
//         x="4"
//         y="4"
//         width="12"
//         height="4"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//       <path d="M8 12H12" stroke="#FCD34D" strokeWidth="2" />
//     </svg>
//   );
// }

// function ArchiveActiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect
//         x="5"
//         y="8"
//         width="10"
//         height="8"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//       <rect
//         x="4"
//         y="4"
//         width="12"
//         height="4"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//       <path d="M8 12H12" stroke="#FCD34D" strokeWidth="2" />
//     </svg>
//   );
// }

// function MoveInactiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M10 4H4V16H10V4Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//       <path d="M16 8H12" stroke="#FCD34D" strokeWidth="2" />
//       <path d="M16 12H12" stroke="#FCD34D" strokeWidth="2" />
//     </svg>
//   );
// }

// function MoveActiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M10 4H4V16H10V4Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//       <path d="M16 8H12" stroke="#FCD34D" strokeWidth="2" />
//       <path d="M16 12H12" stroke="#FCD34D" strokeWidth="2" />
//     </svg>
//   );
// }

// function DeleteInactiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M6 6V8H7H14V8V6H14H6ZM8 10V14C8 14.55 8.45 15 9 15H11C11.55 15 12 14.55 12 14V10H8Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//       <path
//         d="M9 6H11V8H9V6Z"
//         fill="#F59E0B"
//         stroke="#FCD34D"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

// function DeleteActiveIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M6 6V8H7H14V8V6H14H6ZM8 10V14C8 14.55 8.45 15 9 15H11C11.55 15 12 14.55 12 14V10H8Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//       <path
//         d="M9 6H11V8H9V6Z"
//         fill="#C05621"
//         stroke="#DD6B20"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// }

const Header = () => {
  const { logged } = useStore();

  return (
    <div className="flex justify-between bg-orange-400 p-2">
      <div className="flex items-center justify-center font-bold text-2xl font-logotext mt-2">
        Reedit
      </div>
      <div>{!logged ? <HeaderMenuNotLogged /> : <HeaderMenuLogged />}</div>
    </div>
  );
};

export default Header;
