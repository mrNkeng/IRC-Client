import { Route, Routes } from "react-router-dom";
import { ChatApplication } from "renderer/components/ChatApplication/ChatApplication";
import { Signup } from "renderer/components/SignUp/Signup";
import { Accountsettings } from "renderer/components/UserSettings/Accountsettings";
import { Login } from "./components/Login/Login";
import { observer } from "mobx-react-lite"
import { Toaster } from "./components/Toaster";
import { getNotificationState } from "./state";

export const App = observer((props: {}) => {
  const toast = getNotificationState().toast;
  return (
    <>
      <Toaster toast={toast}/>
      <Routes>
        <Route path="/Chat" element={<ChatApplication />} />
        <Route path="/Accountsettings" element={<Accountsettings />} />
        <Route path="*" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
})
