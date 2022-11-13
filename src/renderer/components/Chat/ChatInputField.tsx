import React, { useRef } from 'react';
// import './style.css';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputFieldProps {
  chat: string;
  setchat: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const ChatInputField: React.FC<ChatInputFieldProps> = (props: ChatInputFieldProps) => {
  const { chat, setchat, handleAdd } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={handleAdd} className="chat_input_field_form">
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
export default ChatInputField;
