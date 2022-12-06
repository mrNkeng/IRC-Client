import Typography from '@mui/material/Typography';
import { Message } from "data-models/IRCData";
import { observer } from 'mobx-react';


type Props = {
  chat: Message;
  chats: Message[];
};

const Chatbubble = observer(({ chat, chats }: Props) => {
  const chatBubbleClasses = ["Chatbubble"];
  chatBubbleClasses.push(chat.isSelf ? "self_chat": "other_chat");

  const message = chat.isSelf ? chat.content : chat.sender + ": " + chat.content;
  return (
    <div className={chatBubbleClasses.join(" ")}>
      <Typography className="Chatbubbletext">{message}</Typography>
    </div>
  );
});

export default Chatbubble;
