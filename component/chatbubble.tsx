import { chat } from "../model";
import { render } from "react-dom";
import "./style.css";

type Props = {
  chat: chat;
  chats: chat[];
  setchats: React.Dispatch<React.SetStateAction<chat[]>>;
};

const Chatbubble = ({ chat, chats, setchats }: Props) => {
  const chatBubbleClasses = ["Chatbubble"];
  chatBubbleClasses.push(chat.isOther ? "other_chat" : "self_chat");
  return (
    <div className={chatBubbleClasses.join(" ")}>
      <span className="Chatbubbletext">{chat.chat}</span>
    </div>
  );
};

export default Chatbubble;
