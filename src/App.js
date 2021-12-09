import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import CurrentUser from "./Components/CurrentUser";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignUp />
        <Login />
        <CurrentUser />
      </header>
    </div>
  );
}

export default App;
