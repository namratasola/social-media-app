import React from 'react';
import '../styles/Home.css';
import Post from '../components/Post';
import HomeLogo from '../components/HomeLogo';
import Navbar from '../components/Navbar';
import Stories from '../components/Stories';
import { useTheme } from "../theme-context";
const Home = () => {
  // const { theme } = useTheme();
  return (
    // <home className={`page ${theme}`}>
    <div className='homePage'>
      <HomeLogo /> 
      <Navbar />
      <Stories />
      <Post />
      
    </div>
    // </home>
  )
}

export default Home