import React from 'react'
import HelpCard from './Help.Card'
import { useNavigate } from "react-router-dom";
import "./text.css";
import { AiOutlineRight } from "react-icons/ai";
const Help = () => {
  // const thtd={
  //   padding: "12px",
  // textAlign: "left"
  // }
  const navigate = useNavigate();
  return (
    <div style={{width:"100%",height:"100vh",
    background: "linear-gradient(90deg, rgba(13,11,41,1) 32%, rgba(105,17,17,1) 77%, rgba(38,69,75,1) 100%)",padding:"10px"}}>
    <HelpCard/>
    <table style={{border:"1px solid white",borderRadius:"15px",margin:"auto",width:"auto",borderCollapse:"collapse",marginTop:"10px"}}>
      <thead>
        <tr>
        <th style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Sr.No.</th>
          <th style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Key</th>
          <th style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Action</th>
          
        </tr>
      </thead>
      <tbody>
      
          <tr>
          <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>1</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>"a"</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Press a to move left</td>
          </tr>
          <tr>
          <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>2</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>"d"</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Press d to move right</td>
          </tr>
          <tr>
          <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>3</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>"w"</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Press w to move up</td>
          </tr>

          <tr>
          <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>4</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>"s"</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>Press s to move down</td>
          </tr>
          <tr>
          <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>5</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>"hover mouse pointer"</td>
            <td style={{padding:"12px",textAlign:"left",border:"1px solid white"}}>direct your mouse pointer you want <br/>to shoot and press left click</td>
          </tr>
      </tbody>
    </table>
    <div style={{display:"flex",justifyContent:"center",gap:"10px",marginTop:"10px"}}>
    <p className='text'  onClick={() => navigate("/game")} >Play</p>
    <p className='text'  onClick={() => navigate("/")} >Back </p>
    </div>
  
    </div>
  )
}

export default Help