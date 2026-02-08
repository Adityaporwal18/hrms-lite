import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const [attendance, setAttendance] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState("");
  const [attDate, setAttDate] = useState("");
  const [attStatus, setAttStatus] = useState("Present");

  // ---------------- FETCH EMPLOYEES ----------------
  const fetchEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ---------------- ADD EMPLOYEE ----------------
  const addEmployee = async () => {
    if (!employeeId || !fullName || !email || !department) {
      alert("All fields required");
      return;
    }

    await api.post("/employees", {
      employee_id: employeeId,
      full_name: fullName,
      email,
      department,
    });

    setEmployeeId("");
    setFullName("");
    setEmail("");
    setDepartment("");

    fetchEmployees();
  };

  // ---------------- DELETE EMPLOYEE ----------------
  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    await api.delete(`/employees/${id}`);
    fetchEmployees();
  };

  // ---------------- ATTENDANCE ----------------
  const markAttendance = async () => {
    if (!selectedEmp || !attDate) {
      alert("Select employee and date");
      return;
    }

    await api.post("/attendance", {
      employee_id: selectedEmp,
      date: attDate,
      status: attStatus,
    });

    alert("Attendance marked");
  };

  const getAttendance = async (id) => {
    const res = await api.get(`/attendance/${id}`);
    setAttendance(res.data);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>HRMS Lite</h1>

      {/* ---------------- ADD EMPLOYEE ---------------- */}
      <h2>Add Employee</h2>

      <input
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br /><br />

      <button onClick={addEmployee}>Add Employee</button>

      {/* ---------------- EMPLOYEE LIST ---------------- */}
      <h2 style={{ marginTop: "40px" }}>Employee List</h2>

      <ul>
        {employees.map((emp) => (
          <li key={emp.employee_id} style={{ marginBottom: "10px" }}>
            {emp.full_name} — {emp.department}

            <button
              onClick={() => deleteEmployee(emp.employee_id)}
              style={{
                marginLeft: "10px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

            <button
              onClick={() => getAttendance(emp.employee_id)}
              style={{
                marginLeft: "8px",
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              View Attendance
            </button>
          </li>
        ))}
      </ul>

      {/* ---------------- ATTENDANCE ---------------- */}
      <h2 style={{ marginTop: "40px" }}>Mark Attendance</h2>

      <select
        value={selectedEmp}
        onChange={(e) => setSelectedEmp(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.employee_id} value={emp.employee_id}>
            {emp.full_name}
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        value={attDate}
        onChange={(e) => setAttDate(e.target.value)}
      />

      <br /><br />

      <select
        value={attStatus}
        onChange={(e) => setAttStatus(e.target.value)}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <br /><br />

      <button onClick={markAttendance}>Mark Attendance</button>

      {/* ---------------- ATTENDANCE LIST ---------------- */}
      <h2 style={{ marginTop: "40px" }}>Attendance Records</h2>

      <ul>
        {attendance.map((a, i) => (
          <li key={i}>
            {a.date} — {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
