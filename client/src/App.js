import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { userRoutes } from "./routes";
import { useAuth } from "./hooks/authHook";
import { AuthContext } from "./context/authContext";
import { Navbar } from "./components/Navbar";
import "materialize-css";

function App() {
  const { token, login, logout, userId, ready, userName } = useAuth();
  const isAuthenticated = !!token;
  const routes = userRoutes(isAuthenticated);

  // if (!ready) {
  //   return <Loader />;
  // }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        userName,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
