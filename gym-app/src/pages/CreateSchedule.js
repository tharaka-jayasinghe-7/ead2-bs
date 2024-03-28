import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateSchedule() {
  const { memberId } = useParams(); // Extract memberId from URL params
  const memberIdFromPath = window.location.pathname.split("/").pop();

  const [fields, setFields] = useState([
    {
      id: 1,
      exercise: "",
      sets: "",
      reps: "",
    },
  ]);

  const handleAdd = () => {
    setFields([
      ...fields,
      { id: fields.length + 1, exercise: "", sets: "", reps: "" },
    ]);
  };

  const handleRemove = (i) => {
    if (fields.length === 1) return;
    const values = [...fields];
    values.splice(i, 1);
    setFields([...values]);
  };

  const currentDate = new Date().toISOString().split("T")[0]; // Get current system date

  return (
    <Container
      className="mt-5 d-flex justify-content-center shadow p-5 mb-5 bg-body rounded "
      style={{ maxWidth: "800px" }}
    >
      <Row>
        <h2 className="text-center" style={{ marginTop: "3rem" }}>
          Create Schedule
        </h2>
        <h6 className="text-center">Member ID: {memberIdFromPath}</h6>

        <h6 className="text-center">Date: {currentDate}</h6>
        <Form>
          <Form.Group controlId="formBasicEmail">
            {fields.map((field, i) => (
              <Row key={i} className="mt-4">
                <Col md>
                  <Form.Label>Exercise</Form.Label>
                  <Form.Control type="text" placeholder="Enter Exercise" />
                </Col>

                <Col xs={2}>
                  <Form.Label>Sets</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Sets"
                    className="form-control"
                  />
                </Col>

                <Col xs={2}>
                  <Form.Label>Reps</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Reps"
                    className="form-control"
                  />
                </Col>

                <Col md="auto" className="d-flex align-items-center">
                  <Button
                    onClick={() => handleAdd(i)}
                    variant="success"
                    className="me-2 mt-4"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => handleRemove(i)}
                    variant="danger"
                    className="ms-2 mt-4"
                    disabled={fields.length === 1}
                  >
                    -
                  </Button>
                </Col>
              </Row>
            ))}
          </Form.Group>
          <Button
            variant="primary mt-3"
            type="submit"
            style={{ margin: "auto" }}
          >
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}

export default CreateSchedule;
