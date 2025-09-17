import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./Modules/User/Redux/Store.ts";

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen text-orange-500">
            <div className="spinner"></div>
            <p>Loading MSAtrades...</p>
          </div>
        }
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);

// ✅ Remove the initial loader once React has mounted
const loader = document.getElementById("initial-loader");
if (loader) loader.remove();
