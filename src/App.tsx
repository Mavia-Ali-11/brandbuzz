import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import { ToastContainer } from 'react-toastify';
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>

      <ToastContainer newestOnTop />
    </>
  );
}

export default App;
