import React from "react";
import { Chat } from "data-models";
import Chatbubble from "./Chatbubble";
// import "./style.css";

interface Props {
  chats: Array<Chat>;
  setchats: React.Dispatch<React.SetStateAction<Chat[]>>;
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
