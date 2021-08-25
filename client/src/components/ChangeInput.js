import React, { useContext, useState, useEffect } from "react";

import { useHttp } from "../hooks/httpHook";
import { AuthContext } from "../context/authContext";
import { useMessage } from "../hooks/messageHook";
// import {Loader} from '../components/Loader'

export const ChangeInput = ({ setIsShowChangeInput }) => {
  const [input, setInput] = useState("");
  const { token, userName, login } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const message = useMessage();

  const changeHendler = (e) => {
    setInput(e.target.value);
  };

  const changeUserName = async () => {
    if (!input) {
      return setIsShowChangeInput(false);
    }
    try {
      const data = await request(
        `/update/${input}`,
        "POST",
        { userName },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("userData")),
          userName: input,
        })
      );
      window.location.reload(false);

      setIsShowChangeInput(false);
      message(data.message);
    } catch (e) {}
  };

  return (
    <div>
      <input
        placeholder={userName}
        value={input}
        onInput={changeHendler}
        style={{ color: "black" }}
      />
      <button onClick={changeUserName}>submit</button>
    </div>
  );
};
