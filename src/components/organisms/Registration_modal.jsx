import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { X_logo } from '../atoms/X_logo'
import { FloatingInput } from '../molecules/FloatingInput'
import axios from 'axios'
import axiosCaseConverter from 'simple-axios-case-converter';

const Modal = styled.div`
  position: fixed;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  padding: 2rem;
  border-radius: 15px;
  min-width: 600px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`

const Overlay = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(91,112,131,0.4);
`

const Button = styled.button`
  width: 75%;
  height: 60px;
  border-radius: 9999px;
  background-color: #8A8A94;
  color: black;
  font-size: 17px;
  font-weight: bold;
  margin-top: 40px;
`

const Title = styled.span`
color: white;
font-size: 31px;
font-weight: bold;
text-align: left;
width: 75%;
height: 75px;
`

export const Registration_modal = ({show, close}) => {

  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('');
  
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users',{
        phone_number: phone_number,
        email: email,
        birthday: birthday, 
        password: password,
        password_confirmation: password_confirmation,
        confirm_success_url: 'http://localhost:5173'
      });
      console.log(response.data);
      setPassword("");
      setPassword_confirmation("");
      setPhone_number("");
      setEmail("");
      setBirthday("");
    } catch(error) {
      console.error(error.response.data.errors);
    }
  };

  useEffect(() => {
    const onKeyDownEsc = (event) => {
      if (show && event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKeyDownEsc)
    return () => window.removeEventListener('keydown', onKeyDownEsc)
  }, [show, close]);

  return (
    <>
      { show ? <Overlay onClick={close}></Overlay> : null }
      {
        show ? 
      <Modal>
        <X_logo width='28px' height='26px' box_height="53px" />
        <Title>アカウントを作成</Title>
        <FloatingInput type="text" label="電話番号" value={phone_number} onChange={e => setPhone_number(e.target.value)}/>
        <FloatingInput type="text" label="メールアドレス" value={email} onChange={e => setEmail(e.target.value)}/>
        <FloatingInput type="text" label="生年月日" value={birthday} onChange={e => setBirthday(e.target.value)} />
        <FloatingInput type="password" label="パスワード" value={password} onChange={e => setPassword(e.target.value)} />
        <FloatingInput type="password" label="パスワード(確認用)" value={password_confirmation} onChange={e => setPassword_confirmation(e.target.value)} />
          <Button onClick={handleSignUp}>登録</Button>
      </Modal>
       :
      null
      }
    </>
  )
}
