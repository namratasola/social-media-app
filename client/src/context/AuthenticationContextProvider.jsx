import React, { createContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({children}) => { 

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const profilePic = 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80';
  const profilePic = 'https://chamaksaathi.com/static/media/userImage.5098297c24ed5b5f7874.png';

  const inputs = {username: username, email: email, password: password, profilePic: profilePic};


  const navigate = useNavigate();

  const login = async () =>{

    try{

      const loginInputs = {email: email, password: password}
        await axios.post('http://localhost:6001/login', loginInputs)
        .then( async (res)=>{
            console.log("holaads",res);
            localStorage.setItem('userToken', res.data.token);
            localStorage.setItem('userId', res.data.user._id);
            localStorage.setItem('username', res.data.user.username);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('profilePic', res.data.user.profilePic);
            localStorage.setItem('posts', res.data.user.posts);
            localStorage.setItem('followers', res.data.user.followers);
            localStorage.setItem('following', res.data.user.following);
            navigate('/');
        }).catch((err) =>{
            console.log(err);
        });

    }catch(err){
        console.log(err);
    }
  }

  const register = async () =>{

    try{
        await axios.post('http://localhost:6001/register', inputs)
        .then( async (res)=>{
          localStorage.setItem('userToken', res.data.token);
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('username', res.data.user.username);
          localStorage.setItem('email', res.data.user.email);
          localStorage.setItem('profilePic', res.data.user.profilePic);
          localStorage.setItem('posts', res.data.user.posts);
          localStorage.setItem('followers', res.data.user.followers);
          localStorage.setItem('following', res.data.user.following);  
          navigate('/');
        }).catch((err) =>{
            //console.log(err);
            if (err.response) {
              // Server responded with a status other than 200 range
              console.log('Error response:', err.response.data);
              if (err.response.status === 409) {
                alert('User already exists');
              } else {
                alert(`user already exists ${err.response.data.message || ''}`);
              }
            } else if (err.request) {
              // Request was made but no response was received
              console.log('Error request:', err.request);
              alert('user already exists');
            } else {
              // Something else caused the error
              console.log('Error message:', err.message);
              alert('user already exists');
            }
        });

    }catch(err){
        console.log(err);
    }
  }



  const logout = async () =>{
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/landing');
  }



  return (
    <AuthenticationContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword }} >{children}</AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider