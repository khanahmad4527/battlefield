import React from "react";
import HomeCard from "./Home.Card";
import "./text.css";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-red-500 to-green-500 flex flex-col items-center justify-center gap-10">
      <HomeCard />
      <p
        className="text text-white text-lg font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/game")}
      >
        Start <AiOutlineRight />
      </p>
      <p
        className="text-white cursor-pointer underline"
        onClick={() => navigate("/help")}
      >
        Need Help ?
      </p>
      <AudioPlayer />
    </div>
  );
};

export default Home;
