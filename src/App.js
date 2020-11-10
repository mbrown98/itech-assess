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

  const addStudent = () => {
    routes.post("/students", { firstName: "Bobby", lastName: "Joe" });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div
          onClick={() => {
            addStudent();
          }}
        >
          Add Student
        </div>
      </header>
    </div>
  );
}

export default App;
