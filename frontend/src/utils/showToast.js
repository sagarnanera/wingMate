// show toast

import toast from "react-hot-toast";

export const showToast = (message, type) => {
  switch (type) {
    case "success":
      toast.success(message, { position: "top-right" });
      break;
    case "error":
      toast.error(message, { position: "top-right" });
      break;
    case "loading":
      toast.loading(message, { position: "top-right" });
      break;
    default:
      toast.custom(message, { position: "top-right" });
  }
};
