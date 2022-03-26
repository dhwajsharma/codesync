import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState([
    {
      socketId: 1,
      username: "dhwaj",
    },
    {
      socketId: 2,
      username: "kunal",
    },
  ]);

  return (
    <div className="editorPage">
      <div className="editorPage__aside">
        <div className="editorPage__asideInner">
          <div className="editorPage__logo">
            <img
              className="editorPage__logoImage"
              src="/code-sync.png"
              alt="logo"
            />
          </div>
          <h3>Connected</h3>
          <div className="editorPage__clientList">
            {clients.map((client) => (
              <Client username={client.username} key={client.socketId} />
            ))}
          </div>
        </div>
        <button className="editorPage__btn editorPage__copyBtn">
          Copy ROOM ID
        </button>
        <button className="editorPage__btn editorPage__LeaveBtn">Leave</button>
      </div>
      <div className="editorPage__editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
