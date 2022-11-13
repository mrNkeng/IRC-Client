import { Chat } from "data-models";

type Props = {
  chat: Chat;
  chats: Chat[];
  setchats: React.Dispatch<React.SetStateAction<Chat[]>>;
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
