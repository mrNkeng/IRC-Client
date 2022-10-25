import React from "react";
import { chat } from "../model";
import Chatbubble from "./chatbubble";
import "./style.css";

interface Props {
  chats: Array<chat>;
  setchats: React.Dispatch<React.SetStateAction<chat[]>>;
}

const Chatbubblelist: React.FC<Props> = ({ chats, setchats }) => {
  return (
    <div className="chats">
      {chats?.map((chat, key) => (
        <Chatbubble
          chat={chat}
          key={chat.id}
          chats={chats}
          setchats={setchats}
        />
      ))}
    </div>
  );
};
export default Chatbubblelist;
