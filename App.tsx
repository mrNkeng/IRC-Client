import "./styles.css";
import CircleIcon from "@mui/icons-material/Circle";
import React, { useState } from "react";
import InputField from "./component/InputFeild";
import { chat } from "./model";
import SendIcon from "@mui/icons-material/Send";
import ChatBubblelist from "./component/Chatbubblelist";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ChatWindow } from "./component/ChatWindow";
// import Split from "react-split";
type HeaderProps = {
  title: string;
  icon: JSX.Element;
};
const Header: React.FC<HeaderProps> = ({ icon, title }) => {
  return (
    <header>
      <h1>{title}</h1>
      {icon}
    </header>
  );
};

const App: React.FC = () => {
  return (
    <div className="Container">
      <div>sever</div>
      <ChatWindow/>
      <div>vector</div>
    </div>  
  )
};
export default App;
