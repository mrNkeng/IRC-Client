import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";
import InputField from "./InputFeild";
import { chat } from "../model";
import SendIcon from "@mui/icons-material/Send";
import ChatBubblelist from "./Chatbubblelist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {

}

export const ChatWindow = (props: Props) => {
    const [chat, setchat] = useState<string>("");
    const [chats, setchats] = useState<Array<chat>>([]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (chat) {
            setchats([...chats, { id: Date.now(), chat, isOther: true }]);
            setchat("");
        }
    };
    console.log(chats);
    return (
        <div className="App">

            <span className="Profile-Pic">
                <AccountCircleIcon sx={{ fontSize: 50 }} />{" "}
            </span>
            <span className="Recepient">
                Cyclops <CircleIcon color="success" sx={{ fontSize: 12 }} />
            </span>
            <div className="chatWindow">
                <ChatBubblelist chats={chats} setchats={setchats} />
            </div>

            <InputField chat={chat} setchat={setchat} handleAdd={handleAdd} />
        </div>

    );
};