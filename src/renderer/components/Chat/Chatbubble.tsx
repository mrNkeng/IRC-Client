import Typography from '@mui/material/Typography';
import React from "react";
import { Message } from "data-models/IRCData";

type Props = {
  chat: Message;
  chats: Message[];
  setchats: React.Dispatch<React.SetStateAction<Message[]>>;
};

const Chatbubble = ({ chat, chats, setchats }: Props) => {
  const chatBubbleClasses = ["Chatbubble"];
  chatBubbleClasses.push(chat.isSelf ? "self_chat": "other_chat");
  return (
    <div className={chatBubbleClasses.join(" ")}>
      <Typography className="Chatbubbletext">{chat.content}</Typography>
    </div>
  );
};

export default Chatbubble;
