import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <MantineProvider>
      <AppRoutes />
      <Toaster />
    </MantineProvider>
  );
}

export default App;
