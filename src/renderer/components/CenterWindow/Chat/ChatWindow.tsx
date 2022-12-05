import React, { useState } from "react";
import ChatInputField from "./ChatInputField";
import ChatBubblelist from "./Chatbubblelist";
import "./ChatStyles.css";
import { getStore } from "renderer/state";
import { Message } from "data-models/IRCData";
import { observer } from "mobx-react";

interface Props {
  messages: Array<Message>
}

export const ChatWindow = observer((props: Props) => {
    const [chat, setchat] = useState<string>("");

    const { messages } = getStore();
    return (
        <div className="ChatWindow">
            <ChatBubblelist chats={messages} />
            <ChatInputField chat={chat} setchat={setchat} handleAdd={() => {}} />
        </div>
    );
});
