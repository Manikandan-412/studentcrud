import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        phone: "",
        image: null
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
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("age", formData.age);
        data.append("phone", formData.phone);
        if (formData.image) data.append("image", formData.image);

        try {
            const response = await axios.post("https://studentcrud-gi2u.onrender.com/users/upload", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(response.data.message);
        } catch (error) {
            console.error("Error uploading data:", error);
        }
    };

    return (
        <div>
            <h2>Upload User Data</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
                <input type="file" accept="image/*" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadForm;