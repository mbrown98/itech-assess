import React, { useEffect, useState } from "react";
import "./App.css";
import routes from "./api/routes";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function App() {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);

  const getStudents = async () => {
    try {
      const response = await routes.get("/students");

      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addStudent = async () => {
    await routes.post("/addStudent", {
      firstName: firstName,
      lastName: lastName,
    });
    await getStudents();
    setFirstName("");
    setLastName("");
  };

  const deleteAllStudents = async () => {
    await routes.post("/deleteAll");
    await getStudents();
    setFirstName("");
    setLastName("");
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <h1 style={{ fontWeight: "bold", fontSize: 60, flex: 2, marginTop: 20 }}>
        CLASSROOM
      </h1>
      <div style={{ flex: 1 }} className="formInput">
        {" "}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          style={{ margin: 10 }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          style={{ margin: 10 }}
        />
      </div>
      <div style={{ flex: 1 }}>
        {" "}
        <Button
          variant="primary"
          onClick={() => {
            addStudent();
          }}
          style={{ margin: 15 }}
        >
          {" "}
          Add Student
        </Button>{" "}
        <Button
          variant="danger"
          onClick={() => {
            deleteAllStudents();
          }}
          style={{ margin: 15 }}
        >
          {" "}
          Clear All
        </Button>{" "}
      </div>

      <Table
        striped
        bordered
        hover
        style={{ backgroundColor: "white", width: 500, fontSize: 12, flex: 20 }}
      >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            return (
              <tr style={{ height: 5 }}>
                <td> {student.firstName}</td>
                <td>{student.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {!students.length && <div>Classroom is Empty</div>}
    </div>
  );
}

export default App;
