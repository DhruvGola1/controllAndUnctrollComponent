// UpdateStudent.js — UPDATE operation
// ============================================================
// ✅ WHAT TO IMPORT FOR UPDATING DATA:
//    getDatabase → connects to your Firebase Realtime Database
//    ref         → points to the specific student you want to update
//    update      → merges new values WITHOUT deleting other fields
//
// ⚠️  IMPORTANT DIFFERENCE:
//    set()    → REPLACES the entire record (erases fields you don't send)
//    update() → MERGES only the fields you send (safe to use!)
//    Always use update() when editing existing records.
// ============================================================
import { getDatabase, ref, update } from "firebase/database";
import { app } from ".././firebase.js";
import React, { useState } from "react";

// Connect to Firebase Database
const db = getDatabase(app);

const UpdateStudent = () => {
  // 📦 The student ID to identify WHICH student to update
  const [studentId, setStudentId] = useState("");

  // 📦 Only the fields the user wants to change
  // Leave a field empty to keep its current value in Firebase
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    semester: "",
    city: "",
    dob: "",
  });

  const [message, setMessage] = useState("");

  // 🔄 Updates only the changed field in state
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // 💾 Called when user clicks "Update Student"
  const handleUpdate = () => {
    if (!studentId) {
      setMessage("❌ Please enter the Student ID to update.");
      return;
    }

    // 🧹 Remove empty fields so we don't accidentally overwrite with blank values
    // Object.entries gives us [["name",""], ["email","Dhruv"]] etc.
    const filteredFields = Object.fromEntries(
      Object.entries(fields).filter(([key, value]) => value !== ""),
    );

    if (Object.keys(filteredFields).length === 0) {
      setMessage("❌ Please fill in at least one field to update.");
      return;
    }

    // ✅ update() only changes the fields you pass in
    // Other fields in Firebase are left untouched
    update(ref(db, `students/${studentId}`), filteredFields)
      .then(() => {
        setMessage("✅ Student updated successfully!");
        // Reset form
        setStudentId("");
        setFields({
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
      <div className="card-header update-header">
        <span className="card-icon">✏️</span>
        <div>
          <h2 className="card-title">Update Student</h2>
          <p className="card-subtitle">
            Only fills fields you change · others stay the same
          </p>
        </div>
      </div>

      {/* Student ID input — required to know WHICH student to update */}
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <label className="form-label">
          Student ID <span className="required">*</span>
          <span className="label-hint">
            {" "}
            — copy from the student card above
          </span>
        </label>
        <input
          className="form-input id-input"
          type="text"
          placeholder="e.g. 1718291847362dsfsdf"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <div className="section-divider">
        Fields to update (leave blank to keep current value)
      </div>

      <div className="form-grid">
        {/* Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="New name..."
            value={fields.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="New email..."
            value={fields.email}
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
            placeholder="New phone..."
            value={fields.phone}
            onChange={handleChange}
          />
        </div>

        {/* Course */}
        <div className="form-group">
          <label className="form-label">Course</label>
          <select
            className="form-input"
            name="course"
            value={fields.course}
            onChange={handleChange}
          >
            <option value="">-- Keep current --</option>
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
            value={fields.semester}
            onChange={handleChange}
          >
            <option value="">-- Keep current --</option>
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
            placeholder="New city..."
            value={fields.city}
            onChange={handleChange}
          />
        </div>

        {/* DOB — full width */}
        <div className="form-group full-width">
          <label className="form-label">Date of Birth</label>
          <input
            className="form-input"
            type="date"
            name="dob"
            value={fields.dob}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="btn btn-amber" onClick={handleUpdate}>
        ✏️ Update Student in Firebase
      </button>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default UpdateStudent;
