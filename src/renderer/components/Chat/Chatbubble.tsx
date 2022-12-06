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
  return (
    <div className={chatBubbleClasses.join(" ")}>
      <Typography className="Chatbubbletext">{chat.sender + ": " + chat.content}</Typography>
    </div>
  );
});

export default Chatbubble;
