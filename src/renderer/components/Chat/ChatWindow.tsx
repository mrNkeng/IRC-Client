import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";
import ChatInputField from "./ChatInputField";
import ChatBubblelist from "./Chatbubblelist";
import "./ChatStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Message } from "data-models/interfaces";
import { observer } from "mobx-react";

interface Props {
  messages: Array<Message>
}

export const ChatWindow = observer((props: Props) => {
    const [chat, setchat] = useState<string>("");
    return (
        <div className="ChatWindow">
            <ChatBubblelist chats={props.messages} />
            <ChatInputField chat={chat} setchat={setchat} handleAdd={() => {}} />
        </div>
    );
});
