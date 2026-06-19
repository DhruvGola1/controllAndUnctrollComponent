// DeleteStudent.js — DELETE operation
// ============================================================
// ✅ WHAT TO IMPORT FOR DELETING DATA:
//    getDatabase → connects to your Firebase Realtime Database
//    ref         → points to the specific student you want to delete
//    remove      → permanently deletes the data at that path
//
// ⚠️  WARNING: remove() is permanent. There is no undo.
//    Always confirm with the user before deleting!
// ============================================================
import { getDatabase, ref, remove } from "firebase/database";
import { app } from ".././firebase.js";
import React, { useState } from "react";

// Connect to Firebase Database
const db = getDatabase(app);

const DeleteStudent = () => {
  // 📦 The student ID to identify WHICH student to delete
  const [studentId, setStudentId] = useState("");

  // 📦 Whether to show the confirmation prompt
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  // 🔴 Step 1: User clicks "Delete" → show confirm box first
  const handleDeleteClick = () => {
    if (!studentId) {
      setMessage("❌ Please enter a Student ID to delete.");
      return;
    }
    setShowConfirm(true); // Show the confirmation box
    setMessage("");
  };

  // 🔴 Step 2: User confirms → actually delete from Firebase
  const confirmDelete = () => {
    // ✅ remove() deletes everything at  students/<studentId>
    remove(ref(db, `students/${studentId}`))
      .then(() => {
        setMessage("✅ Student deleted successfully!");
        setStudentId("");
        setShowConfirm(false);
      })
      .catch((error) => {
        setMessage("❌ Error: " + error.message);
        setShowConfirm(false);
      });
  };

  // ❌ User cancels → hide confirm box
  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="card delete-card">
      <div className="card-header delete-header">
        <span className="card-icon">🗑️</span>
        <div>
          <h2 className="card-title">Delete Student</h2>
          <p className="card-subtitle">
            Permanently removes student from Firebase
          </p>
        </div>
      </div>

      {/* Warning banner */}
      <div className="warning-banner">
        ⚠️ <strong>Warning:</strong> Deletion is permanent and cannot be undone.
        Copy the Student ID from the list above before deleting.
      </div>

      {/* Student ID input */}
      <div className="form-group" style={{ marginBottom: "16px" }}>
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
          placeholder="e.g. 1718291847362"
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
            setShowConfirm(false); // Reset confirm if ID changes
            setMessage("");
          }}
        />
      </div>

      {/* Delete Button — only shows if confirm box is not open */}
      {!showConfirm && (
        <button className="btn btn-red" onClick={handleDeleteClick}>
          🗑️ Delete Student
        </button>
      )}

      {/* Confirmation Box — appears after clicking Delete */}
      {showConfirm && (
        <div className="confirm-box">
          <p className="confirm-text">
            Are you sure you want to delete student with ID:
            <br />
            <code className="confirm-id">{studentId}</code>
          </p>
          <div className="confirm-buttons">
            <button className="btn btn-red" onClick={confirmDelete}>
              Yes, Delete
            </button>
            <button className="btn btn-outline" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default DeleteStudent;
