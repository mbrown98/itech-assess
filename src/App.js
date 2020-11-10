import React, { useEffect } from "react";
import "./App.css";
import routes from "./api/routes";

function App() {
  const getStudents = async () => {
    try {
      const response = await routes.get("/students");
      console.log("response", response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
