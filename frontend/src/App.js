import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from '../src/components/Login';
import Search from './components/Search';
import UpdateProduct from './components/EditProduct';
import Register from './components/Register';
import OTPscreen from './components/OtpScreen';
import SendOTPEmail from './components/sendOTPEmail';
import ForgatePass from './components/forgatePass';
import AddPost from './components/addPost';
import AllPost from './components/allPost';
import AddComment from './components/addComent';
import UpdateProfile from './components/updateProfile';
import Chat from './components/chat';
import ChatRoom from './components/chatRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/updateProfile" element={<UpdateProfile />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/chatRoom" element={<ChatRoom />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/addComment/:id" element={<AddComment />} />
      <Route path="/allPost" element={<AllPost />} />
      <Route path="/search" element={<Search />} />
      <Route path="/updateProduct/:id" element={<UpdateProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path='/otp' element={<OTPscreen/>}/>
      <Route path='/sendOTP' element={<SendOTPEmail/>}/>
      <Route path='/updatePass' element={<ForgatePass/>}/>
      
    </Routes>
  );
}

export default App; 