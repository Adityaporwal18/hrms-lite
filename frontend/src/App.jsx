import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const loadEmployees = async () => {
    const res = await api.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const addEmployee = async () => {
    try {
      await api.post("/employees", form);
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      loadEmployees();
    } catch (err) {
      alert(err.response?.data?.detail || "Error adding employee");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>HRMS Lite</h1>

      <h2>Add Employee</h2>

      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
      /><br /><br />

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
      /><br /><br />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br /><br />

      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      /><br /><br />

      <button onClick={addEmployee}>Add Employee</button>

      <h2 style={{ marginTop: "40px" }}>Employee List</h2>

      {employees.length === 0 && <p>No employees found</p>}

      <ul>
        {employees.map((e) => (
          <li key={e.employee_id}>
            {e.full_name} — {e.department}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
