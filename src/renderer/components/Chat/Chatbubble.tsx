import { Chat } from "data-models";
import Typography from '@mui/material/Typography';

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
      <Typography className="Chatbubbletext">{chat.chat}</Typography>
    </div>
  );
};

export default Chatbubble;
