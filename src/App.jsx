import { Route, Routes } from "react-router-dom";
import { LoginPages } from "./components/pages/LoginPages";
import { MainPages } from "./components/pages/MainPages";
import { TweetDetailsPages } from "./components/pages/TweetDetailsPages";
import { ProfilePage } from "./components/pages/ProfilePage";
import { LoginUserPage } from "./components/pages/LoginUserPage";
import { UserDataProvider } from "./components/providers/UserDataProvider";

function App() {
  return (
    <UserDataProvider>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/main/*" element={<MainPages />} />
        <Route path="/tweets/:id" element={<TweetDetailsPages />} />
        <Route path="/profile" element={<LoginUserPage />} />
        <Route path="/users/:id" element={<ProfilePage />} />
      </Routes>
    </UserDataProvider>
  );
}

export default App;
