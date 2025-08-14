import { Route, Routes } from "react-router-dom";
import { LoginPages } from "./components/pages/LoginPages";
import { MainPages } from "./components/pages/MainPages";
import { TweetDetailsPages } from "./components/pages/TweetDetailsPages";
import { ProfilePage } from "./components/pages/ProfilePage";
import { useState } from "react";
import { LoginUserPage } from "./components/pages/LoginUserPage";
import { UserDataProvider } from "./components/providers/UserDataProvider";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userTweets, setUserTweets] = useState([]);

  return (
    <UserDataProvider>
      <Routes>
        <Route path="/" element={<LoginPages />} />
        <Route path="/main/*" element={<MainPages />} />
        <Route path="/tweets/:id" element={<TweetDetailsPages />} />
        <Route
          path="/profile"
          element={
            <LoginUserPage
              setIsLoading={setIsLoading}
              setUserTweets={setUserTweets}
              userTweets={userTweets}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProfilePage
              setIsLoading={setIsLoading}
              setUserTweets={setUserTweets}
              userTweets={userTweets}
              isLoading={isLoading}
            />
          }
        />
      </Routes>
    </UserDataProvider>
  );
}

export default App;
