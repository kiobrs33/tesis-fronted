import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
