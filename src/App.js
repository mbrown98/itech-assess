import React, { useEffect, useState } from "react";
import "./App.css";
import routes from "./api/routes";
import StudentsTable from "./components/StudentsTable";
import FormsInputs from "./components/FormsInputs";

function App() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await routes.get("/students");
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="App">
      <h1 style={{ fontWeight: "bold", fontSize: 60, flex: 2, marginTop: 20 }}>
        CLASSROOM
      </h1>
      <FormsInputs getStudents={getStudents} />
      <StudentsTable students={students} />
    </div>
  );
}

export default App;
