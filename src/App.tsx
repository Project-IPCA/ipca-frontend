import { Provider } from "react-redux";
import Router from "./Router";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <Router />
      <ToastContainer />
    </Provider>
  );
}

export default App;
