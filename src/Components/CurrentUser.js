import React, { useState } from "react";
import Axios from "axios";
Axios.defaults.withCredentials = true;
const CurrentUser = () => {
  const [name, setName] = useState("User....");
  const getUser = () => {
    Axios.get("http://localhost:5000/user").then((res) => {
      console.log(res.data);
      setName(res.data);
    });
  };
  const logOut = () => {
    Axios.get("http://localhost:5000/logout").then((res) => {
      console.log(res.data);
    });
  };
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={getUser}>Get User</button>
      <br />
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default CurrentUser;
