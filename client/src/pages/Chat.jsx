import React from 'react'
import '../styles/Chat.css'
import Navbar from '../components/Navbar'
import Sidebar from '../components/chat/Sidebar'
import UserChat from '../components/chat/UserChat'
import { useTheme } from "../theme-context";


const Chat = () => {
  // const { theme } = useTheme();
  return (
    //  <chat className={`page ${theme}`}>
    <div className='chatPage'>
      {/* <HomeLogo /> */}
      <Navbar />

    <div className="home">

      <Sidebar  />
      <UserChat />
      
    </div>
    </div>
    // </chat>  
  )
}

export default Chat