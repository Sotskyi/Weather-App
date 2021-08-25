import React, { useContext, useEffect, useState } from "react";

import { useHttp } from "../hooks/httpHook";
import { useMessage } from "../hooks/messageHook";
import { AuthContext } from "../context/authContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.userName);
    } catch (e) {}
  };

  return (
    <div className="row ">
      <div className="center-align col s6 offset-s3 ">
        <h1>Check the Weather</h1>
        <div className="card orange accent-3">
          <div className="card-content white-text">
            <span className="card-title">Autorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Enter userName"
                  id="userName"
                  type="text"
                  name="userName"
                  className="yellow-input"
                  value={form.userName}
                  onChange={changeHandler}
                />
                <label htmlFor="userName"></label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="email"></label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn grey lighten-1"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Log in
            </button>
            <button
              className="btn grey lighten-1"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
