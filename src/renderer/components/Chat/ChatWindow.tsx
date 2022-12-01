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
    // TODO: Should the client be able to adjust the state from here? Or should the user also be able to update it.
    const [chats, setchats] = useState<Array<Message>>(props.messages);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (chat) {
            setchats([...chats, { id: Date.now(), content: chat, isSelf: true }]);
            setchat("");
        }
    };
    return (
        <div className="ChatWindow">
            <ChatBubblelist chats={chats} setchats={setchats} />
            <ChatInputField chat={chat} setchat={setchat} handleAdd={handleAdd} />
        </div>

    );
});
