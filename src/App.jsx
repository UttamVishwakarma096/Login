import { useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", user);
      console.log("Server response: ", res.data.massage);
    } catch (err) {
      console.error("Login fail: ", err);
      alert("Login failed");
    }
  };

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <h1 className="bg-green-400 text-center text-white text-3xl p-4 ">
        login
      </h1>
      <div className="h-screen bg-green-700 flex justify-center pt-20">
        <form onSubmit={handleLogin}>
          <div className="bg-green-300 p-4 rounded-2xl">
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleOnChange}
              className="text-2xl p-3 rounded-xl bg-white border-none my-3"
            />{" "}
            <br />
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="password"
              className="text-2xl p-3 rounded-xl bg-white border-none my-3"
            />{" "}
            <br />
            <button
              className="bg-blue-400 w-full text-2xl text-white rounded-2xl cursor-pointer p-3 my-3"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
