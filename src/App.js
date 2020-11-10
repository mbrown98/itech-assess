import React, { useEffect, useState } from "react";
import "./App.css";
import routes from "./api/routes";

function App() {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);

  const getStudents = async () => {
    try {
      const response = await routes.get("/students");
      console.log(response);
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addStudent = () => {
    routes.post("/students", { firstName: firstName, lastName: lastName });
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />

        <div
          onClick={() => {
            addStudent();
          }}
        >
          Add Student
        </div>
        {students.map((student) => {
          return (
            <div>
              {student.firstName} {student.lastName}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
