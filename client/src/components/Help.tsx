import React from "react";
import HelpCard from "./Help.Card";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";

const Help = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gradient-to-b from-purple-900 via-red-700 to-blue-500 p-10 text-white">
      <HelpCard />
      <table className="border-2 border-white rounded-md mx-auto w-auto border-collapse mt-10">
        <thead>
          <tr>
            <th className="p-4 text-left border-2 border-white">Sr.No.</th>
            <th className="p-4 text-left border-2 border-white">Key</th>
            <th className="p-4 text-left border-2 border-white">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 text-left border-2 border-white">1</td>
            <td className="p-4 text-left border-2 border-white">
              {<AiOutlineArrowLeft />}
            </td>
            <td className="flex items-center gap-1 p-4 text-left border-2 border-white">
              Press <AiOutlineArrowLeft /> to move left{" "}
            </td>
          </tr>
          <tr>
            <td className="p-4 text-left border-2 border-white">2</td>
            <td className="p-4 text-left border-2 border-white">
              {<AiOutlineArrowRight />}
            </td>
            <td className="flex items-center gap-1 p-4 text-left border-2 border-white">
              Press {<AiOutlineArrowRight />} to move right
            </td>
          </tr>
          <tr>
            <td className="p-4 text-left border-2 border-white">3</td>
            <td className="p-4 text-left border-2 border-white">
              <AiOutlineArrowUp />
            </td>
            <td className="flex items-center gap-1 p-4 text-left border-2 border-white">
              Press <AiOutlineArrowUp /> to move up
            </td>
          </tr>
          <tr>
            <td className="p-4 text-left border-2 border-white">4</td>
            <td className="p-4 text-left border-2 border-white">
              <AiOutlineArrowDown />{" "}
            </td>
            <td className="flex items-center gap-1 p-4 text-left border-2 border-white">
              Press <AiOutlineArrowDown /> to move down
            </td>
          </tr>
          <tr>
            <td className="p-4 text-left border-2 border-white">5</td>
            <td className="p-4 text-left border-2 border-white">
              "hover mouse pointer"
            </td>
            <td className="p-4 text-left border-2 border-white">
              Direct your mouse pointer you want to shoot and press left click
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center gap-10 mt-10">
        <button
          className="text-white bg-green-500 rounded-lg py-2 px-4 hover:bg-green-600 transition-colors"
          onClick={() => navigate("/game")}
        >
          Play
        </button>
        <button
          className="text-white bg-gray-500 rounded-lg py-2 px-4 hover:bg-gray-600 transition-colors"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Help;
