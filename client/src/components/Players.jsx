import React from "react";

const Players = ({ player, you }) => {
  return (
    <div className="bg-red-900 p-2 absolute top-12 rounded-md">
      <div className="text-center text-white">
        <p className="font-3  p-2 ">Players</p>
        {player?.map((el) => {
          return (
            <div className="flex items-center gap-2">
              <span className="rounded-lg p-1  bg-green-500"> </span>
              <p>
                {el}&nbsp;
                {el == you ? "( You )" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Players;
