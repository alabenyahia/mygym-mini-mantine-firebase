import "@mantine/core/styles.css";

import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#f0f4ff",
  "#e2e5f0",
  "#c3c9d7",
  "#a4abc0",
  "#8992ab",
  "#78829f",
  "#6e7a9a",
  "#5c6887",
  "#515c7a",
  "#434f6e",
];

const theme = createTheme({
  colors: {
    blue: myColor,
  },
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
      <Toaster />
    </MantineProvider>
  );
}

export default App;
