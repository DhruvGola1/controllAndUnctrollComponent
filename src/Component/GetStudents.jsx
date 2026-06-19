// GetStudents.js — READ operation
// ============================================================
// ✅ WHAT TO IMPORT FOR READING DATA:
//    getDatabase → connects to your Firebase Realtime Database
//    ref         → points to the path you want to read from
//    onValue     → listens for data in real-time (auto-updates)
//
// 💡 ALTERNATIVE: use get() instead of onValue() if you only
//    want to fetch data ONCE (not listen for live changes)
// ============================================================
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from ".././firebase.js";
import React, { useState, useEffect } from "react";

// Connect to Firebase Database
const db = getDatabase(app);

const GetStudents = () => {
  // 📦 State to hold the list of students fetched from Firebase
  const [students, setStudents] = useState([]);

  // 📦 State to show a loading message while data is being fetched
  const [loading, setLoading] = useState(true);

  // useEffect runs ONCE when the component first loads (because of the empty [] at the end)
  useEffect(() => {
    // ✅ onValue() listens to the "students" path in Firebase
    // Every time data changes in Firebase, this function runs automatically
    onValue(ref(db, "students"), (snapshot) => {
      const data = snapshot.val(); // Get the raw data object from Firebase

      if (data) {
        // Firebase returns an OBJECT, but we need an ARRAY to use .map()
        // Object.values() converts { key1: {...}, key2: {...} } into [{...}, {...}]
        setStudents(Object.values(data));
      } else {
        setStudents([]); // No students found
      }

      setLoading(false); // Done loading
    });
  }, []); // ← Empty array means "run only once when component mounts"

  // Helper: show semester with suffix
  const semesterLabel = (s) => {
    const suffixes = { 1: "st", 2: "nd", 3: "rd" };
    return s ? `${s}${suffixes[s] || "th"} Sem` : "—";
  };

  return (
    <div className="card">
      <div className="card-header read-header">
        <span className="card-icon">📋</span>
        <div>
          <h2 className="card-title">All Students</h2>
          <p className="card-subtitle">
            Reading from Firebase in real-time · {students.length} record
            {students.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {loading && <p className="loading-text">⏳ Loading from Firebase...</p>}

      {/* Empty state */}
      {!loading && students.length === 0 && (
        <div className="empty-state">
          <p>No students yet. Add one using the form above!</p>
        </div>
      )}

      {/* Student Cards */}
      <div className="student-list">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            {/* Avatar circle using initials */}
            <div className="avatar">
              {student.name
                ? student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "?"}
            </div>

            <div className="student-info">
              <div className="student-name">{student.name}</div>
              <div className="student-email">{student.email}</div>

              <div className="student-meta">
                {student.phone && (
                  <span className="meta-item">📱 {student.phone}</span>
                )}
                {student.dob && (
                  <span className="meta-item">🎂 {student.dob}</span>
                )}
                {student.city && (
                  <span className="meta-item">📍 {student.city}</span>
                )}
              </div>

              <div className="student-badges">
                {student.course && (
                  <span className="badge badge-blue">{student.course}</span>
                )}
                {student.semester && (
                  <span className="badge badge-green">
                    {semesterLabel(student.semester)}
                  </span>
                )}
                <span className="badge badge-gray">ID: {student.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetStudents;
