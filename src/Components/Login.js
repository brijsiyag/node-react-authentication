import React, { useState } from "react";
import Axios from "axios";
Axios.defaults.withCredentials = true;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login", {
      username: username,
      password: password,
    }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <form
        onSubmit={login}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          name="username"
          value={username}
          placeholder="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
