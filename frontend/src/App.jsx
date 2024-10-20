import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";

function App() {
  const [lastName, setLastName] = useState("");
  const [heritage, setHeritage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setHeritage(""); // Clear previous results
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/heritage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lastName }),
      });
      const data = await response.json();
      if (response.ok) {
        setHeritage(data.heritage);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  // Handle reset button click
  const handleReset = () => {
    setLastName("");
    setHeritage("");
    setError("");
    setLoading(false); // Make sure the form is not in a loading state
  };

  return (
    <Container fluid className="d-flex justify-content-center mt-5">
      <Row className="justify-content-center w-300">
        <Col xs={12} md={12} lg={12}>
          <h1 className="text-center mb-4">Surname Lookup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Enter Your Surname</Form.Label>
              <Form.Control type="text" placeholder="e.g., Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" className="w-45" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Looking up...
                  </>
                ) : (
                  "Find Heritage"
                )}
              </Button>
              <Button variant="secondary" type="button" className="w-45" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>

          {heritage && (
            <Alert variant="success" className="mt-4">
              <strong>Heritage:</strong> {heritage}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;