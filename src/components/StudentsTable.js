import React from "react";
import Table from "react-bootstrap/Table";

const StudentsTable = ({ students }) => {
  return (
    <>
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
      {!students.length && <div style={{ flex: 1 }}>Classroom is Empty</div>}
    </>
  );
};

export default StudentsTable;
