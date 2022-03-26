import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (e) => {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);

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
