import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [attendance, setAttendance] = useState({ name: "", inTime: "", outTime: "", topic: "" });

    useEffect(() => {
        axios.get("http://localhost:5000/users/profile")
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data");
                setLoading(false);
            });
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        setAttendance({ ...attendance, [e.target.name]: e.target.value });
    };

    const handleAttendanceSubmit = () => {
        axios.post("http://localhost:5000/attendance", attendance)
            .then(response => {
                alert("Attendance recorded successfully!");
                setShowModal(false);
            })
            .catch(error => {
                console.error("Error recording attendance:", error);
                alert("Failed to record attendance");
            });
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={user.image} alt="Profile" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }} />
                    </div>
                    <div className="col-md-8">
                        <h2>{user.name}</h2>
                        <p><strong>Address:</strong> {user.address}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Course:</strong> {user.course}</p>
                        <p><strong>College:</strong> {user.college}</p>
                        <p><strong>Department:</strong> {user.department}</p>
                        <p><strong>Passed Out Year:</strong> {user.passedOut}</p>
                        <Button variant="primary" onClick={handleShowModal}>Mark Attendance</Button>
                    </div>
                </div>
            </div>

            {/* Attendance Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Mark Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={attendance.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>In Time</Form.Label>
                            <Form.Control type="time" name="inTime" value={attendance.inTime} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Out Time</Form.Label>
                            <Form.Control type="time" name="outTime" value={attendance.outTime} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic</Form.Label>
                            <Form.Control type="text" name="topic" value={attendance.topic} onChange={handleChange} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleAttendanceSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfilePage;
