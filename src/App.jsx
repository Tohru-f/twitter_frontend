import { Route, Routes } from "react-router-dom";
import { LoginPages } from "./components/pages/LoginPages";
import { MainPages } from "./components/pages/MainPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPages />} />
      <Route path="/main" element={<MainPages />} />
    </Routes>
  );
}

export default App;
