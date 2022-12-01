import React from "react";
import { Chat } from "data-models";
import Chatbubble from "./Chatbubble";
import { Box } from "@mui/material";
import { Message } from "data-models/interfaces";

interface Props {
  chats: Array<Message>;
  setchats: React.Dispatch<React.SetStateAction<Array<Message>>>;
}

const Chatbubblelist: React.FC<Props> = ({ chats, setchats }) => {
  return (
    <Box className="chats">
      {chats?.map((chat) => (
        <Chatbubble
          chat={chat}
          key={chat.id}
          chats={chats}
          setchats={setchats}
        />
      ))}
    </Box>
  );
};
export default Chatbubblelist;
