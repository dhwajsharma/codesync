import React, { useState } from "react";
import { v4 } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = v4();
    setRoomId(id);
  };

  return (
    <div className="home">
      <div className="home__formWrapper">
        <img
          className="home__homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="home__mainLabel">Paste invitation ROOM ID</h4>
        <div className="home__inputGroup">
          <input
            type="text"
            className="home__inputBox"
            placeholder="ROOM ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            className="home__inputBox"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="home__btn home__joinBtn">Join</button>
          <span className="home__createInfo">
            If you don't have an invite then create &nbsp;
            <a onClick={createNewRoom} href="" className="home__createNewBtn">
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 by{" "}
          <a href="https://github.com/dhwajsharma" target="_blank">
            Dhwaj Sharma
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
