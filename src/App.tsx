import { RouterProvider } from "react-router";

import { router } from "./router";
import { ThemeProvider } from "./provider/theme.provider";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
