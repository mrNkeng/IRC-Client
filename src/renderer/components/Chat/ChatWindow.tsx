import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";
import ChatInputField from "./ChatInputField";
import { Chat } from "./data-models";
import ChatBubblelist from "./Chatbubblelist";
import "./ChatStyles.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {

}

export const ChatWindow = (props: Props) => {
    const [chat, setchat] = useState<string>("");
    const [chats, setchats] = useState<Array<Chat>>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (chat) {
            setchats([...chats, { id: Date.now(), chat, isOther: false }]);
            setchat("");
        }
    };
    return (
        <div className="ChatWindow">
            <ChatBubblelist chats={chats} setchats={setchats} />
            <ChatInputField chat={chat} setchat={setchat} handleAdd={handleAdd} />
        </div>

    );
};
