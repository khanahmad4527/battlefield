import React from 'react'
import HomeCard from './Home.Card'
// AiOutlineRight
import { AiOutlineRight } from "react-icons/ai";
import "./text.css"
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div  style={{width:"100%",height:"100vh",
    background: "linear-gradient(90deg, rgba(13,11,41,1) 32%, rgba(105,17,17,1) 77%, rgba(38,69,75,1) 100%)",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"10px"}} >
   <HomeCard/>
   <p className='text'  onClick={() => navigate("/game")} >Start <AiOutlineRight/></p>
    </div>
  )
}

export default Home