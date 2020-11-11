import React, { useState } from "react";
import routes from "../api/routes";
import Button from "react-bootstrap/Button";

import ReCAPTCHA from "react-google-recaptcha";

const FormsInputs = ({ getStudents }) => {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [rechaptaApproved, setRechaptaApproved] = useState(false);

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
  return (
    <>
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
        {!rechaptaApproved && (
          <ReCAPTCHA
            sitekey="6LdIhOEZAAAAAE9ngmtAC1584OO10WdnwBrd_8eX"
            onChange={() => setRechaptaApproved(true)}
            style={{ margin: 10 }}
          />
        )}
      </div>
      {rechaptaApproved && (
        <div style={{ flex: 1 }}>
          <Button
            variant="primary"
            onClick={() => {
              addStudent();
            }}
            style={{ margin: 15 }}
          >
            Add Student
          </Button>{" "}
          <Button
            variant="danger"
            onClick={() => {
              deleteAllStudents();
            }}
            style={{ margin: 15 }}
          >
            Clear All
          </Button>{" "}
        </div>
      )}
    </>
  );
};

export default FormsInputs;
