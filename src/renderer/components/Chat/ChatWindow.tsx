import React, { useState } from "react";
import ChatInputField from "./ChatInputField";
import ChatBubblelist from "./Chatbubblelist";
import "./ChatStyles.css";
import { getStore } from "renderer/state";
import { Message } from "data-models/IRCData";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";


export const ChatWindow = observer(() => {
  //todo maybe add back metadata?
  const { messages, selectedChannel } = getStore();
  return (
    <Box className="TextWindow">
      <Box className = "WindowHeadingContainer">
        <Typography className="WindowHeading">
          {selectedChannel}
        </Typography>
      </Box>
        <div className="ChatWindow">
          <ChatBubblelist chats={messages} />
          <ChatInputField />
        </div>
    </Box>
  );
});
