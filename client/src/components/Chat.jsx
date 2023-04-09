import React, { useEffect, useState } from "react";

const Chat = ({ chat, chatFun }) => {
  const [msg, setMsg] = useState("");
  const sendMsg = () => {
    chatFun(msg);
    setMsg("");
  };

  return (
    <div className="p-2 text-white  absolute right-0">
      <div className="flex flex-row gap-10">
        <input
          className="p-2 rounded-lg outline-none text-black"
          type="text"
          name=""
          id=""
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="Message...."
        />
        <button className="p-2 bg-slate-500" onClick={sendMsg}>
          Send Msg
        </button>
      </div>
      <div className="p-1 text-center  text-lg ">
        {chat?.map((el, i) => {
          return (
            <p key={i} className="p-1 bg-transparent">
              {el}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
