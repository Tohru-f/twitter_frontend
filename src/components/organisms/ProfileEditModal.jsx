import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FloatingInput } from "../molecules/FloatingInput";
import { axiosInstance } from "../../utils/HandleAxios";
import CameraImage from "../../assets/camera.png";
import { saveUserDataContext } from "../providers/UserDataProvider";

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 50%;
  max-height: 80%;
  // display: flex;
  // flex-flow: column;
  // justify-content: center;
  // align-items: center;
  padding-top: 10px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 100px;
    border: 1px solid #3b3b3b;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3b3b3b;
    border-radius: 100px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(91, 112, 131, 0.4);
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5%;
  position: sticky;
  z-index: 1005;
`;

const CloseButton = styled.button`
  color: white;
  background-color: black;
  border: none;
  margin-right: 70px;
  &:hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.p`
  color: white;
  font-weight: bold;
`;

const SaveButton = styled.button`
  background-color: white;
  color: black;
  border-radius: 20px;
  font-weight: bold;
  padding: 5px 15px 5px 15px;
  margin-left: 200px;
  &:hover {
    cursor: pointer;
  }
`;

const MainBox = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 95%;
`;

const PictureBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1b1b1b;
  z-index: 1003;
  position: absolute;
  top: 20%;
  left: 48%;
`;

const ImageButton = styled.button`
  height: 30px;
  width: 30px;
  z-index: 1005;
  position: absolute;
  top: 15%;
  left: 15%;
  // background-color;
  background: transparent;
  border: none;
  &: hover {
    cursor: pointer;
  }
`;

const DummyImage = styled.img`
  z-index: 1004;
  position: absolute;
  top: 20%;
  left: 22%;
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  z-index: 1002;
  position: relative;
`;

const HeaderDummySpace = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
  z-index: 1002;
  position: relative;
  background-color: black;
`;

const IconAndDummyIconBox = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1b1b1b;
  z-index: 1003;
  position: absolute;
  top: 30%;
  left: 10%;
`;

const IconImage = styled.img`
  width: 120px;
  height: 120px;
  z-index: 1003;
  border-radius: 50%;
  position: absolute;
  top: 24.5%;
  left: 3.5%;
  border: 2px solid black;
`;

const IconDummySpace = styled.div`
  width: 120px;
  height: 120px;
  z-index: 1003;
  border-radius: 50%;
  background-color: #3b3b3b;
  // background-color: white;
  position: absolute;
  top: 25%;
  left: 4.5%;
  border: 2px solid black;
`;

const HorizontalSpace = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
  z-index: 1003;
`;

export const ProfileEditModal = ({
  show,
  close,
  headerImage,
  setHeaderImage,
  iconImage,
  setIconImage,
  setUserTweets,
}) => {
  // App.jsxで管理しているstateをContextで受け継ぐ
  const { userInfo, setUserInfo } = useContext(saveUserDataContext);
  // const [userInfo, setUserInfo] = useState({});

  // ヘッダーとアイコンについてプレビュー画像のURLを管理
  const [headerPreview, setHeaderPreview] = useState([]);
  const [iconPreview, setIconPreview] = useState([]);

  // 画像選択ボタンから参照させるために使用
  const headerInputRef = useRef(null);
  const iconInputRef = useRef(null);

  // ユーザー情報の入力対応処理、nameにはカラム(name, profile, location, website)がvalueには入力値が入る
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // プロフィール情報とアイコン、ヘッダー画像を更新
  const handleUserInfoSave = async () => {
    // 画像ファイル(ヘッダー用)を送る場合、FormDataに格納する必要がある
    const headerData = new FormData();
    // 複数の画像に対応するためにheaderIdを配列で管理する。
    const headerId = [];

    // 画像ファイル(アイコン用)を送る場合、FormDataに格納する必要がある
    const iconData = new FormData();
    // 複数の画像に対応するためにiconIdを配列で管理する。
    const iconId = [];

    // ヘッダー画像が存在する場合に画像idを取得する処理
    if (!!headerImage) {
      headerData.append("files[]", headerImage[0]);
      console.log(headerImage);
      if (headerImage.length > 0) {
        const headerResponse = await axiosInstance.post("/images", headerData);
        console.log(headerResponse.data);
        for (let res of headerResponse.data.blobs) {
          headerId.push(res.id);
        }
      }
      console.log(headerImage);
      console.log(headerId);
    }

    // アイコン画像が存在する場合に画像idを取得する処理
    if (!!iconImage) {
      iconData.append("files[]", iconImage[0]);
      console.log(iconImage);
      if (iconImage.length > 0) {
        const iconResponse = await axiosInstance.post("/images", iconData);
        console.log(iconResponse.data);
        for (let res of iconResponse.data.blobs) {
          iconId.push(res.id);
        }
      }
    }
    // 新しいプロフィール情報と画像idを使ってプロフィールを更新する
    const response = await axiosInstance.put("/profile", {
      name: userInfo.name,
      profile: userInfo.profile,
      location: userInfo.location,
      website: userInfo.website,
      birthday: userInfo.birthday,
      header_id: headerId,
      icon_id: iconId,
    });
    console.log(response.data);
    // プロフィールが正しく更新できればstate変数を初期化する
    if (response.status === 200) {
      setHeaderImage([]);
      setHeaderPreview([]);
      console.log(headerImage);
      setIconImage([]);
      setIconPreview([]);
      close();
    }
  };

  // プロフィール編集画面を表示した時にデータベースからログインユーザーの情報を取得して初期レンダリングする
  // モーダルの開閉時にはプロフィールの内容が書き換わっているので、showが変わる時に再レンダリングする
  useEffect(() => {
    const getLoginUserInfo = async () => {
      const response = await axiosInstance.get("/users");
      console.log(response.data);
      setUserInfo(response.data.data.user);
      setUserTweets(response.data.data.user.tweets);
    };
    getLoginUserInfo();
  }, [show]);

  // ヘッダー画像のプレビュー画像の取り込みと表示
  const handleHeaderPreviewChange = (e) => {
    const uploadedFile = e.target?.files;
    console.log(uploadedFile);
    // 画像ファイルはFileListオブジェクト(配列のようなもの)なので配列データに変換する
    const fileArray = Array.from(uploadedFile);
    const imageURL = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader(); // ファイル内容をメモリに読み込むAPI
        reader.onload = (e) => resolve(e.target.result); // 読み込み完了時に発火し、結果をe.target.resultで取得
        reader.readAsDataURL(file); // ファイルをData URL形式で非同期読み込み。画像表示にはData URL形式が必要
      });
    });
    Promise.all(imageURL).then((result) => {
      setHeaderPreview(result);
    });

    // FileListオブジェクト(配列のようなもの)をArray.fromで配列に変換する。選択した画像がe.target.fileに入る
    const file = Array.from(e.target.files);
    if (file.length > 0) {
      // 選択した画像を設定する。画像投稿の前準備
      setHeaderImage([...headerImage, file[0]]);
      console.log(headerImage);
    }
  };

  // アイコン画像のプレビュー画像の取り込みと表示
  const handleIconPreviewChange = (e) => {
    const uploadedFile = e.target?.files;
    console.log(uploadedFile);
    // 画像ファイルはFileListオブジェクト(配列のようなもの)なので配列データに変換する
    const fileArray = Array.from(uploadedFile);
    const imageURL = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader(); // ファイル内容をメモリに読み込むAPI
        reader.onload = (e) => resolve(e.target.result); // 読み込み完了時に発火し、結果をe.target.resultで取得
        reader.readAsDataURL(file); // ファイルをData URL形式で非同期読み込み。画像表示にはData URL形式が必要
      });
    });
    Promise.all(imageURL).then((result) => {
      setIconPreview(result);
    });

    // FileListオブジェクト(配列のようなもの)をArray.fromで配列に変換する。選択した画像がe.target.fileに入る
    const file = Array.from(e.target.files);
    if (file.length > 0) {
      // 選択した画像を設定する。画像投稿の前準備
      setIconImage([...iconImage, file[0]]);
      console.log(iconImage);
    }
  };

  useEffect(() => {
    // showがtrue且つ、押下されたキーがEscapeボタンの場合に実行される
    const onKeyDownEsc = (event) => {
      if (show && event.key === "Escape") {
        event.preventDefault();
        close();
      }
    };
    // window全体にイベントリスナーを追加
    window.addEventListener("keydown", onKeyDownEsc);
    // useEffectの再実行やアンマウント時に前回のイベントリスナーを削除
    return () => window.removeEventListener("keydown", onKeyDownEsc);
  }, [show, close]);

  // 編集画面におけるヘッダー画像の表示を管理
  const handleHeaderGround = () => {
    let backGroundData;
    if (!(userInfo.header_urls === null)) {
      if (userInfo.header_urls.length > 0 && headerPreview.length === 0) {
        backGroundData = <HeaderImage src={userInfo.header_urls} />;
      } else if (headerPreview.length > 0) {
        backGroundData = <HeaderImage src={headerPreview} />;
      }
    } else if (headerPreview.length > 0) {
      backGroundData = <HeaderImage src={headerPreview} />;
    } else {
      backGroundData = <HeaderDummySpace />;
    }
    return backGroundData;
  };

  // 変種画面におけるアイコン画像の表示を管理
  const handleIconGround = () => {
    let iconGround;
    if (!(userInfo.icon_urls === null)) {
      if (userInfo.icon_urls.length > 0 && iconPreview.length === 0) {
        iconGround = <IconImage src={userInfo.icon_urls} />;
      } else if (iconPreview.length > 0) {
        iconGround = <IconImage src={iconPreview} />;
      }
    } else if (iconPreview.length > 0) {
      iconGround = <IconImage src={iconPreview} />;
    } else {
      iconGround = <IconDummySpace />;
    }
    return iconGround;
  };

  if (!show) return <></>;
  return (
    <>
      <Overlay onClick={close}></Overlay>
      <Modal>
        <HeaderBox>
          <CloseButton onClick={close}>✖︎</CloseButton>
          <HeaderTitle>プロフィールを編集</HeaderTitle>
          <SaveButton onClick={handleUserInfoSave}>保存</SaveButton>
        </HeaderBox>
        <MainBox>
          {handleHeaderGround()}
          <PictureBox>
            {/* ImageButtonコンポーネントから参照されている。 */}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={headerInputRef}
              onChange={handleHeaderPreviewChange}
            />
            <ImageButton
              // inputタグを参照しており、このボタンをクリックするとinputタグをクリックしたことになる。!!は値を真偽値に変換
              onClick={() =>
                !!headerInputRef.current && headerInputRef.current.click()
              }
            />
            {/* ボタンと重ねて使用するボタン用のダミー画像 */}
            <DummyImage src={CameraImage} />
          </PictureBox>
          <IconAndDummyIconBox>
            {handleIconGround()}
            <IconBox>
              {/* ImageButtonコンポーネントから参照されている。 */}
              <input
                type="file"
                accept="image/*"
                hidden
                ref={iconInputRef}
                onChange={handleIconPreviewChange}
              />
              <ImageButton
                // inputタグを参照しており、このボタンをクリックするとinputタグをクリックしたことになる。!!は値を真偽値に変換
                onClick={() =>
                  !!iconInputRef.current && iconInputRef.current.click()
                }
              />
              {/* ボタンと重ねて使用するボタン用のダミー画像 */}
              <DummyImage src={CameraImage} />
            </IconBox>
            <HorizontalSpace />
          </IconAndDummyIconBox>
          <FloatingInput
            type="text"
            label="名前"
            name="name"
            value={userInfo.name || ""}
            onChange={handleUserInfoChange}
          />
          <FloatingInput
            type="text"
            label="自己紹介"
            name="profile"
            value={userInfo.profile || ""}
            onChange={handleUserInfoChange}
          />
          <FloatingInput
            type="text"
            label="場所"
            name="location"
            value={userInfo.location || ""}
            onChange={handleUserInfoChange}
          />
          <FloatingInput
            type="text"
            label="ウェブサイト"
            name="website"
            value={userInfo.website || ""}
            onChange={handleUserInfoChange}
          />
          <FloatingInput
            type="text"
            label="生年月日"
            name="birthday"
            value={userInfo.birthday || ""}
            onChange={handleUserInfoChange}
          />
        </MainBox>
      </Modal>
    </>
  );
};
