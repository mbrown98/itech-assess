import React, { useState } from "react";
import routes from "../api/routes";
import Button from "react-bootstrap/Button";

import ReCAPTCHA from "react-google-recaptcha";

const FormsInputs = ({ getStudents }) => {
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [rechaptaApproved, setRechaptaApproved] = useState(false);

  // request body takes current state of firstName and lastName and sends to addStudent endpoint
  const addStudent = async () => {
    if (firstName && lastName) {
      await routes.post("/addStudent", {
        firstName,
        lastName,
      });
      //after new student has been added, fetch the updated list of students
      await getStudents();

      //clear inputs of firstName and lastName
      setFirstName("");
      setLastName("");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
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
          //using popular ReChaptcha NPM module
          //for deployment sitekey would be stored safely and not stored in Git code
          <ReCAPTCHA
            sitekey="6LdIhOEZAAAAAE9ngmtAC1584OO10WdnwBrd_8eX"
            onChange={() => setRechaptaApproved(true)}
            style={{ margin: 10 }}
          />
        )}
      </div>

      {rechaptaApproved && (
        //this conditional statement ensures that a user is only able to add to list of students once ReCHAPTA verified
        <>
          {errorMessage && (
            <div style={{ color: "red" }}>Please add a First and Last name</div>
          )}
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
        </>
      )}
    </>
  );
};

export default FormsInputs;
