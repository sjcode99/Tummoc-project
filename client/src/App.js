import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Pages/AllRoutes";
import Footer from "./Components/Footer";

function App() {
  return (
    <Box>
      <div style={{padding: '50px'}}>
      {/* <Navbar id="top" /> */}
      <AllRoutes />
      {/* <Footer /> */}
      </div>
    </Box>
  );
}

export default App;