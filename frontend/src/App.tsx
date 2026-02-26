import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import CreatePage from "./pages/createPage";
import HomePage from "./pages/homePage";
import Navbar from "./components/navbar";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
