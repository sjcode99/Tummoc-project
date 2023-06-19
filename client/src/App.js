import { Box } from "@chakra-ui/react";
import AllRoutes from "./Pages/AllRoutes";
import "../src/Styles/Comman.css";


function App() {
  return (
    <Box>
      <div style={{padding: '50px'}}>
        <AllRoutes />
      </div>
    </Box>
  );
}

export default App;