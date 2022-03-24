import React from "react";
import { toast } from "react-toastify";
import ToastifyModal from "../components/ToastifyModal/index";

const messageHandling = (method, errorMessage) => {
  toast.dismiss();
  let message = "Error Message";

  if (errorMessage) {
    message = errorMessage;
  }

  const toastifyModal = (
    <ToastifyModal
      message={message}
    />
  );
    switch (method) {
        case "warn":
        toast.warn(toastifyModal);
        break;
        case "success":
        toast.success(toastifyModal);
        break;
        case "error":
        toast.error(toastifyModal);
        break;
        case "info":
        toast.info(toastifyModal);
        break;
        default:
        toast.default(toastifyModal);
        break;
    }
};

export {
  messageHandling,
};