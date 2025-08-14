import React, { createContext, useState } from "react";

export const saveUserDataContext = createContext({});

export const UserDataProvider = (props) => {
  // 何でも囲めるようにPropsとしてchildrenを受け取るようにする
  const { children } = props;

  const [userInfo, setUserInfo] = useState({});

  return (
    // saveUserDataにはProviderが用意されているものを返却する
    // valueの中にグローバルに扱う実際の値を設定する
    <saveUserDataContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </saveUserDataContext.Provider>
  );
};
