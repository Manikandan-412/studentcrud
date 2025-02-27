import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
        course: "",
        college: "",
        department: "",
        passedOut: "",
        password: "",
        confirmPassword: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post("http://localhost:5000/users/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error uploading data:", error);
            alert("Error uploading data");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Student Registration Form</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
                <div className="mb-3">
                    <label className="form-label">Student Name</label>
                    <input type="text" className="form-control" name="name" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phone" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input type="text" className="form-control" name="course" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">College Name</label>
                    <input type="text" className="form-control" name="college" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-control" name="department" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Passed Out Year</label>
                    <input type="number" className="form-control" name="passedOut" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Upload Photo</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
