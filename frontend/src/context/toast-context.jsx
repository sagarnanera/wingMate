// import React, { createContext, useContext, useEffect, useState } from "react";
// import { Toast } from "flowbite-react";
// import {
//   HiCheck,
//   HiX,
//   HiExclamation,
//   HiInformationCircle,
// } from "react-icons/hi";

// const ToastContext = createContext();

// export const useToast = () => {
//   return useContext(ToastContext);
// };

// const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

//   const showToast = (message, type = "info") => {
//     setToasts((prevToasts) => [...prevToasts, { message, type }]);
//   };

//   const removeToast = (index) => {
//     setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setToasts((prevToasts) => prevToasts.slice(1));
//     }, 15000);

//     return () => clearTimeout(timer);
//   }, [toasts]);

//   return (
//     <ToastContext.Provider value={showToast}>
//       {children}

//       <div className="toast-container">
//         {toasts &&
//           toasts.map((toast, index) => (
//             <Toast
//               key={index}
//               className={`mb-4 toast ${
//                 toast.type === "info"
//                   ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
//                   : toast.type === "success"
//                   ? "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200"
//                   : toast.type === "error"
//                   ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
//                   : "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
//               } `}
//               // onClose={() => removeToast(index)}
//               onAnimationEnd={() => removeToast(index)}
//             >
//               {/* {toast.type === "info" && (
//             <>
//               <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
//                 <HiInformationCircle className="h-5 w-5" />
//               </div>
//               <div className="ml-3 text-sm font-normal">{toast.message}</div>
//             </>
//           )}
//           {toast.type === "success" && (
//             <>
//               <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
//                 <HiCheck className="h-5 w-5" />
//               </div>
//               <div className="ml-3 text-sm font-normal">{toast.message}</div>
//             </>
//           )}
//           {toast.type === "error" && (
//             <>
//               <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
//                 <HiX className="h-5 w-5" />
//               </div>
//               <div className="ml-3 text-sm font-normal">{toast.message}</div>
//             </>
//           )}
//           {toast.type === "warning" && (
//             <>
//               <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200">
//                 <HiExclamation className="h-5 w-5" />
//               </div>
//               <div className="ml-3 text-sm font-normal">{toast.message}</div>
//             </>
//           )} */}
//               {/* <div className="flex items-center justify-around"> */}
//               <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
//                 {toast.type === "info" && (
//                   <HiInformationCircle className="h-5 w-5" />
//                 )}
//                 {toast.type === "success" && <HiCheck className="h-5 w-5" />}
//                 {toast.type === "error" && <HiX className="h-5 w-5" />}
//                 {toast.type === "warning" && (
//                   <HiExclamation className="h-5 w-5" />
//                 )}
//               </div>
//               <div className="mx-3 text-lg font-normal">{toast.message}</div>
//               {/* </div> */}
//               <Toast.Toggle />
//             </Toast>
//           ))}
//       </div>
//     </ToastContext.Provider>
//   );
// };

// export default ToastProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { Toast } from "flowbite-react";
import {
  HiCheck,
  HiX,
  HiExclamation,
  HiInformationCircle,
} from "react-icons/hi";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "info") => {
    setToasts((prevToasts) => [...prevToasts, { message, type }]);
  };

  const removeToast = (index) => {
    setToasts((prevToasts) => prevToasts.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 10000);

    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      <div className="fixed top-20 right-2 sm:right-14">
        {toasts &&
          toasts.map((toast, index) => (
            <Toast
              key={index}
              className={`mb-4 toast ${
                toast.type === "info"
                  ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                  : toast.type === "success"
                  ? "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
                  : "bg-yellow-100 text-yellow-500 dark:bg-yellow-800 dark:text-yellow-200"
              } animate__animated animate__fadeInUp`}
              onAnimationEnd={() => removeToast(index)}
            >
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                {toast.type === "info" && (
                  <HiInformationCircle className="h-5 w-5" />
                )}
                {toast.type === "success" && <HiCheck className="h-5 w-5" />}
                {toast.type === "error" && <HiX className="h-5 w-5" />}
                {toast.type === "warning" && (
                  <HiExclamation className="h-5 w-5" />
                )}
              </div>
              <div className="mx-3 text-lg font-normal">{toast.message}</div>
              <Toast.Toggle />
            </Toast>
          ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
