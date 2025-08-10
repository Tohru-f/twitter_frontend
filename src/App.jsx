import { Route, Routes } from "react-router-dom";
import { LoginPages } from "./components/pages/LoginPages";
import { MainPages } from "./components/pages/MainPages";
import { TweetDetailsPages } from "./components/pages/TweetDetailsPages";
import { ProfilePage } from "./components/pages/ProfilePage";
import { createContext, useState } from "react";
import { axiosInstance } from "./utils/HandleAxios";

export const describeFunction = createContext({});
export const saveUserData = createContext({});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userTweets, setUserTweets] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // idを引数にとって指定のユーザーが持つ投稿データとユーザーデータを取得する
  const describeUserAndTweets = async (id) => {
    setIsLoading(true);
    const response = await axiosInstance.get(`/users/${id}`, { timeout: 5000 });
    console.log(response.data);
    setUserTweets(response.data.data.tweets);
    setIsLoading(false);
  };

  return (
    <saveUserData.Provider value={{ userInfo, setUserInfo, userTweets }}>
      <describeFunction.Provider value={{ describeUserAndTweets }}>
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/main/*" element={<MainPages />} />
          <Route path="/tweets/:id" element={<TweetDetailsPages />} />
          <Route
            path="/users/:id"
            element={
              <ProfilePage
                describeUserAndTweets={describeUserAndTweets}
                setIsLoading={setIsLoading}
                setUserTweets={setUserTweets}
                userTweets={userTweets}
                isLoading={isLoading}
              />
            }
          />
        </Routes>
      </describeFunction.Provider>
    </saveUserData.Provider>
  );
}

export default App;
