import { RouterProvider } from "react-router";

import { router } from "./router";
import { ThemeProvider } from "./provider/theme.provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
