import React from "react";
import { Chat } from "data-models";
import Chatbubble from "./Chatbubble";
import { Box } from "@mui/material";
import { Message } from "data-models/interfaces";
import { observer } from "mobx-react";

interface Props {
  chats: Array<Message>;
}

const Chatbubblelist = observer((props: Props) => {
  const { chats } = props;
  return (
    <Box className="chats">
      {chats?.map((chat) => (
        <Chatbubble
          chat={chat}
          key={chat.id}
          chats={chats}
        />
      ))}
    </Box>
  );
});


export default Chatbubblelist;
