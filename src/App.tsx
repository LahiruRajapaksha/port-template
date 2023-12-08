import { Box } from "@mui/material";
import PortTemplate from "./views/PortTemplate";
import Documents from "./views/Documents";
import Fields from "./views/Fields";

function App() {
  return (
    <Box display="flex" justifyContent="center" height={1} alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        width="75%"
        height="75%"
        p={3}
      >
        <Fields />
        <PortTemplate />
        <Documents />
      </Box>
    </Box>
  );
}

export default App;
