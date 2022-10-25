import React, { useRef } from "react";
import "./style.css";
import SendIcon from "@mui/icons-material/Send";

interface props {
  chat: string;
  setchat: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ chat, setchat, handleAdd }: props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Chat"
        value={chat}
        ref={inputRef}
        onChange={(e) => setchat(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        <SendIcon />
      </button>
    </form>
  );
};
export default InputField;
