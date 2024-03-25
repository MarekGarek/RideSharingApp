import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function useToast() {
  const navigate = useNavigate();

  const showToast = (type, msg, url, functionOnClose) => {
    const commonSettings = {
      position: "top-right",
      autoClose: type === 'success' ? 2000 : 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    };

    const onClose = () => {
      if (functionOnClose) {
        functionOnClose();
      } else if (url) {
        navigate(url);
      }
    };

    if (type === 'success') {
      toast.success(msg, {
        ...commonSettings,
        onClose,
      });
    } else if (type === 'error') {
      toast.error(msg, commonSettings);
    }
  };

  return showToast;
}

export default function MyToasts() {
  return <ToastContainer />;
}

export { useToast };