import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";
export const Toast = (value) => {
  toast.success(value, {
    position: "top-right",
    autoClose: 3000, // Auto close the toast after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined, // Use the default progress bar
  });
};
