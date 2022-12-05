import React, { useRef, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { getStore } from 'renderer/state';
import { Box } from '@mui/material';

interface ChatInputFieldProps {
  // chat: string;
  // setchat: React.Dispatch<React.SetStateAction<string>>;
  // handleAdd: (e: React.FormEvent) => void;
}

const ChatInputField: React.FC<ChatInputFieldProps> = (props: ChatInputFieldProps) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (message !== "") {
      getStore().sendMessage(message);
      setMessage("");
      //TODO the input box isn't getting cleared, someone needs to fix it
    }
  }

  return (
    <Box className="chat_input_field_form">
      <input
        type="text"
        placeholder="Enter a Chat"
        ref={inputRef}
        onChange={(e) => setMessage(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit" onClick={sendMessage}>
        <SendIcon />
      </button>
    </Box>
  );
};
export default ChatInputField;
