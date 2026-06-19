// import { getDatabase, ref, set } from "firebase/database";
// import { app } from "./firebase.js";

// import React from "react";

// const db = getDatabase(app);

// const App = () => {
//   const addDataIntoFirebase = () => {
//     set(ref(db, "users/demo"), {
//       name: "Kitam Jeel",
//       age: 22,
//       id: 1,
//     });
//   };
//   return (
//     <div>
//       FireBase
//       <button onClick={addDataIntoFirebase}>Add Data</button>
//     </div>
//   );
// };

// export default App;

// App.js — Main file that brings all components together
// ============================================================
// This file:
//   1. Imports all 4 CRUD components
//   2. Imports the CSS styles
//   3. Shows tabs to switch between components
// ============================================================
import React, { useState } from "react";

import "./App.css"; // All styles are in one CSS file
import AddStudent from "./Component/AddStudent";
import GetStudents from "./Component/GetStudents";
import UpdateStudent from "./Component/UpdateStudent";
import DeleteStudent from "./Component/DeleteStudent";

const App = () => {
  // 📦 Track which tab is currently active
  // "add" | "list" | "update" | "delete"
  const [activeTab, setActiveTab] = useState("add");

  // Tab config — makes it easy to add more tabs later
  const tabs = [
    { id: "add", label: "➕ Add Student", color: "tab-green" },
    { id: "list", label: "📋 View Students", color: "tab-blue" },
    { id: "update", label: "✏️ Update Student", color: "tab-amber" },
    { id: "delete", label: "🗑️ Delete Student", color: "tab-red" },
  ];

  return (
    <div className="app-wrapper">
      {/* ===== Page Header ===== */}
      <header className="app-header">
        <h1 className="app-title">🎓 Student Manager</h1>
        <p className="app-subtitle">
          Firebase Realtime Database · CRUD Operations
        </p>
      </header>

      {/* ===== Tab Navigation ===== */}
      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${tab.color} ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ===== Tab Content ===== */}
      <main className="app-content">
        {activeTab === "add" && <AddStudent />}
        {activeTab === "list" && <GetStudents />}
        {activeTab === "update" && <UpdateStudent />}
        {activeTab === "delete" && <DeleteStudent />}
      </main>

      {/* ===== Footer ===== */}
      <footer className="app-footer">
        Firebase Realtime Database · React · CRUD · For learning purposes
      </footer>
    </div>
  );
};

export default App;
