import React, { useContext  } from "react";
import Topbar from "../../components/Topbar/Topbar";
import "../Message/Message.css";

import {
  CometChatConversationsWithMessages,
  CometChatThemeContext,
} from "@cometchat/chat-uikit-react";
export default function Message() {
  let { theme } = useContext(CometChatThemeContext);

  theme.palette.setMode("light");
  theme.palette.setPrimary({ light: "#6851D6", dark: "#6851D6" });
  theme.palette.setAccent({ light: "#6851D6", dark: "#6851D6" });
  return (
    <>
      <Topbar />
      <div
        style={{
          marginTop: "80px",
        }}
      >
        <div className="App" style={{ overflow: "hidden", height: "88vh" }}>
          <>
            <CometChatThemeContext.Provider value={{ theme }}>
              <CometChatConversationsWithMessages />
            </CometChatThemeContext.Provider>
          </>
        </div>
      </div>
    </>
  );
}
