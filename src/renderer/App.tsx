import { Route, Routes } from "react-router-dom";
import { ChatApplication } from "renderer/components/ChatApplication/ChatApplication";
import { Signup } from "renderer/components/SignUp/Signup";
import { Accountsettings } from "renderer/components/UserSettings/Accountsettings";
import { Login } from "./components/Login/Login";
import { observer } from "mobx-react-lite"

export const App = observer((props: {}) => {
  return (
    <Routes>
      <Route path="/Chat" element={<ChatApplication />} />
      <Route path="/Accountsettings" element={<Accountsettings />} />
      <Route path="*" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>

  );
})
