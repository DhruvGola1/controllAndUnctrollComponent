// AddStudent.js — CREATE operation
// ============================================================
// ✅ WHAT TO IMPORT FOR WRITING DATA:
//    getDatabase → connects to your Firebase Realtime Database
//    ref         → points to a "path" in the DB (like a folder)
//    set         → writes data at that path (overwrites if exists)
// ============================================================
import { getDatabase, ref, set } from "firebase/database";
import { app } from ".././firebase.js";
import React, { useState } from "react";

// Connect to Firebase Database
const db = getDatabase(app);

const AddStudent = () => {
  // 📦 State holds all form field values
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    semester: "",
    city: "",
    dob: "",
  });

  // 📝 Message shown after saving
  const [message, setMessage] = useState("");

  // 🔄 This function updates whichever field the user types in
  // "e.target.name" matches the "name" attribute on each input
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // 💾 Called when user clicks "Add Student"
  const handleAdd = () => {
    // Basic check — name and email are required
    if (!student.name || !student.email) {
      setMessage("❌ Please fill in Name and Email.");
      return;
    }

    // Use current timestamp as a unique ID (simple approach for beginners)
    const studentId = Date.now();

    // ✅ set() writes data to:  students / <studentId>  in Firebase
    set(ref(db, `students/${studentId}`), {
      ...student, // spread all form fields
      id: studentId, // also save the ID inside the record
    })
      .then(() => {
        setMessage("✅ Student added successfully!");
        // Clear the form after saving
        setStudent({
          name: "",
          email: "",
          phone: "",
          course: "",
          semester: "",
          city: "",
          dob: "",
        });
      })
      .catch((error) => {
        setMessage("❌ Error: " + error.message);
      });
  };

  return (
    <div className="card">
      <div className="card-header add-header">
        <span className="card-icon">➕</span>
        <div>
          <h2 className="card-title">Add New Student</h2>
          <p className="card-subtitle">
            Saves to Firebase under <code>students/</code>
          </p>
        </div>
      </div>

      <div className="form-grid">
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="e.g. Dhruv Patel"
            value={student.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="dhruv@email.com"
            value={student.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            value={student.phone}
            onChange={handleChange}
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <label className="form-label">Course</label>
          <select
            className="form-input"
            name="course"
            value={student.course}
            onChange={handleChange}
          >
            <option value="">-- Select Course --</option>
            <option value="B.Tech">B.Tech</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
          </select>
        </div>

        {/* Semester */}
        <div className="form-group">
          <label className="form-label">Semester</label>
          <select
            className="form-input"
            name="semester"
            value={student.semester}
            onChange={handleChange}
          >
            <option value="">-- Select Semester --</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
            <option value="4">4th Semester</option>
            <option value="5">5th Semester</option>
            <option value="6">6th Semester</option>
            <option value="7">7th Semester</option>
            <option value="8">8th Semester</option>
          </select>
        </div>

        {/* City */}
        <div className="form-group">
          <label className="form-label">City</label>
          <input
            className="form-input"
            type="text"
            name="city"
            placeholder="Ahmedabad"
            value={student.city}
            onChange={handleChange}
          />
        </div>

        {/* Date of Birth — full width */}
        <div className="form-group full-width">
          <label className="form-label">Date of Birth</label>
          <input
            className="form-input"
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="btn btn-green" onClick={handleAdd}>
        ➕ Add Student to Firebase
      </button>

      {/* Success / Error Message */}
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AddStudent;
