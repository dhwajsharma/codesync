import React, { useEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);

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

      // listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} has joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // listening for disconnected event
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} has left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied.");
    } catch (error) {
      toast.error("Failed to copy room ID.");
    }
  };

  const leaveRoom = () => {
    socketRef.current.emit(ACTIONS.LEAVE, {
      roomId,
      username: location.state?.username,
    });
    reactNavigator("/");
  };

  if (!location.state) {
    <Navigate to="/" />;
  }

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
        <button
          className="editorPage__btn editorPage__copyBtn"
          onClick={copyRoomId}
        >
          Copy ROOM ID
        </button>
        <button
          className="editorPage__btn editorPage__LeaveBtn"
          onClick={leaveRoom}
        >
          Leave
        </button>
      </div>
      <div className="editorPage__editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
