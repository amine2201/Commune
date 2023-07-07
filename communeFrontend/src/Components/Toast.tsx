import { Theme, ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    position?: ToastPosition;
    autoClose: number;
    theme?: Theme;
}

const Toast = ({ position, autoClose, theme }:ToastProps) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
};

export const showToast = (message:string, options = {},type:boolean) => {
    console.log(type);
    if (type) toast.success(message, options);
    else toast.error(message, options);
};

export default Toast;
