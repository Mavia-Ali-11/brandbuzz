import { toast } from "react-toastify";
import { ToastOptions } from 'react-toastify';

const defaultConfiguration: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

class NotificationHelper {
    success = (msg = "Success", options?: {}) => {
        toast.success(msg,
            {
                ...defaultConfiguration,
                ...options
            }
        );
    };

    error = (msg: string, options?: {}) => {
        toast.error(msg,
            {
                ...defaultConfiguration,
                ...options
            }
        );
    };
}

const Notify = new NotificationHelper();
export default Notify;
