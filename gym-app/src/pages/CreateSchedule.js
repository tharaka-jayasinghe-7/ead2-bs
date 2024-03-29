import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateSchedule() {
  const memberIdFromPath = window.location.pathname.split("/").pop();

  const [fields, setFields] = useState([
    {
      id: "",
      exercise: "",
      sets: "",
      reps: "",
    },
  ]);

  const [scheduleId, setScheduleId] = useState(1); // Initialize with default value
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadExerciseOptions();
    fetchScheduleId();
  }, []);

  const loadExerciseOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/schedule-ms/exercises"
      );
      setExerciseOptions(response.data);
    } catch (error) {
      console.error("Error loading exercise options:", error);
    }
  };

  const fetchScheduleId = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/schedule-ms/schedules"
      );
      if (response.data.length > 0) {
        const maxId = Math.max(...response.data.map((schedule) => schedule.id));
        setScheduleId(maxId + 1);
      } else {
        setScheduleId(1); // If no schedules exist, start with 1
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFields([
      ...fields,
      { id: scheduleId, exercise: "", sets: "", reps: "" },
    ]);
  };

  const handleRemove = (i) => {
    if (fields.length === 1) return;
    const values = [...fields];
    values.splice(i, 1);
    setFields([...values]);
  };

  const handleExerciseChange = (e, index) => {
    const { value } = e.target;
    const updatedFields = [...fields];
    updatedFields[index].exercise = value;
    setFields(updatedFields);
  };

  const handleSetsChange = (e, index) => {
    const { value } = e.target;
    const updatedFields = [...fields];
    updatedFields[index].sets = value;
    setFields(updatedFields);
  };

  const handleRepsChange = (e, index) => {
    const { value } = e.target;
    const updatedFields = [...fields];
    updatedFields[index].reps = value;
    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new schedule
      const scheduleResponse = await axios.post(
        "http://localhost:8082/schedule-ms/schedules",
        {
          memberId: memberIdFromPath,
          createDate: currentDate,
        }
      );
      const scheduleId = scheduleResponse.data.id;

      // Add schedule exercises
      await Promise.all(
        fields.map((field) =>
          axios.post("http://localhost:8082/schedule-ms/scheduleExercises", {
            sid: scheduleId,
            eid: field.exercise,
            sets: field.sets,
            reps: field.reps,
          })
        )
      );

      // Reset fields after successful submission
      setFields([
        {
          id: "",
          exercise: "",
          sets: "",
          reps: "",
        },
      ]);
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };

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
        <h6 className="text-center">Schedule ID: {scheduleId}</h6>

        <h6 className="text-center">Date: {currentDate}</h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            {fields.map((field, i) => (
              <Row key={i} className="mt-4">
                <Col md>
                  <Form.Label>Exercise</Form.Label>
                  <Form.Control
                    as="select"
                    value={field.exercise}
                    onChange={(e) => handleExerciseChange(e, i)}
                  >
                    <option value="">Choose an option</option>
                    {exerciseOptions.map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col xs={2}>
                  <Form.Label>Sets</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Sets"
                    className="form-control"
                    value={field.sets}
                    onChange={(e) => handleSetsChange(e, i)}
                  />
                </Col>
                <Col xs={2}>
                  <Form.Label>Reps</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Reps"
                    className="form-control"
                    value={field.reps}
                    onChange={(e) => handleRepsChange(e, i)}
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
