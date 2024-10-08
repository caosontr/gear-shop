import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </BrowserRouter>
);
