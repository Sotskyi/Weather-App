import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { ChangeUserNameInput } from "./ChangeUserNameInput";

export const Navbar = () => {
  const [isShowChangeInput, setIsShowChangeInput] = useState(false);
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const auth = useContext(AuthContext);

  useEffect(() => {
    setUserName(auth.userName);
  }, [auth.userName]);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  const changeHandler = () => {
    setIsShowChangeInput(true);
  };

  return (
    <nav>
      <div className="nav-wrapper amber darken-2" style={{ padding: "0 2rem" }}>
        <span className="brand-logo">Hello {userName}</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a onClick={changeHandler}>Change username</a>
            {isShowChangeInput && (
              <ChangeUserNameInput
                userName={userName}
                setIsShowChangeInput={setIsShowChangeInput}
              />
            )}
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
