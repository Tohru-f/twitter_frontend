import { Route, Routes } from "react-router-dom";
import { LoginPages } from "./components/pages/LoginPages";
import { MainPages } from "./components/pages/MainPages";
import { TweetDetailsPages } from "./components/pages/TweetDetailsPages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPages />} />
      <Route path="/main/*" element={<MainPages />} />
      <Route path="/tweets/:id" element={<TweetDetailsPages />} />
    </Routes>
  );
}

export default App;
