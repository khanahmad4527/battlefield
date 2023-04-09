import React from "react";
import HomeCard from "./Home.Card";
// AiOutlineRight
import { AiOutlineRight } from "react-icons/ai";
import "./text.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import "./text.css";

const Home = () => {
  const navigate = useNavigate();
  const [player, setPlayer] = useState("");
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(90deg, rgba(13,11,41,1) 32%, rgba(105,17,17,1) 77%, rgba(38,69,75,1) 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <HomeCard />
      <input
        type="text"
        placeholder="Enter Player Name"
        className="border-1 rounded-md border-l-rose-600 p-3 mb-2"
        value={player}
        onChange={(e) => {
          setPlayer(e.target.value);
        }}
        required
      />
      <button
        disabled={player == ""}
        className="text cursor-pointer w-fit p-3"
        onClick={() => navigate(`/game?player=${player}`)}
      >
        {player == "" ? "Enter Name" : "Start"} <AiOutlineRight />
      </button>
      <p
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => navigate("/help")}
        className="text-white"
      >
        Need Help ?
      </p>

      <AudioPlayer />
    </div>
  );
};

export default Home;
