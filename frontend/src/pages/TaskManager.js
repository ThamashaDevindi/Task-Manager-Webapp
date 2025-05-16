import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 

function TaskManager() {
  // Task list state
  const [tasks, setTasks] = useState([]);

  // Form state
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
    status: "Pending",
  });

  // Search and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("deadline");
  const [sortOrder, setSortOrder] = useState("asc");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or update task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    if (form.id === null) {
      // Add new task
      const newTask = { ...form, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
    } else {
      // Update existing task
      setTasks((prev) =>
        prev.map((task) => (task.id === form.id ? form : task))
      );
    }

    // Reset form
    setForm({
      id: null,
      title: "",
      description: "",
      deadline: "",
      assignedTo: "",
      status: "Pending",
    });
  };

  // Delete a task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (form.id === id) {
        setForm({
          id: null,
          title: "",
          description: "",
          deadline: "",
          assignedTo: "",
          status: "Pending",
        });
      }
    }
  };

  // Edit a task (populate form)
  const handleEdit = (task) => {
    setForm(task);
  };

  // Filtered and sorted tasks
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!a[sortField]) return 1;
      if (!b[sortField]) return -1;

      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === "deadline") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else {
        valA = valA.toString().toLowerCase();
        valB = valB.toString().toLowerCase();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  // Change sort field and toggle order
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  //function to generate the PDF
  const generatePDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Task Report", 14, 15);
  doc.setFontSize(12);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 23);

  autoTable(doc, {
    head: [["Title", "Description", "Deadline", "Assigned To", "Status"]],
    body: filteredTasks.map(task => [
      task.title,
      task.description,
      task.deadline,
      task.assignedTo,
      task.status,
    ]),
    startY: 30,
  });

  doc.save("Task_Report.pdf");
};

  return (
    <div>
      <h2 className="mb-4">Task Manager</h2>

      {/* Task Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Deadline</label>
          <input
            type="date"
            name="deadline"
            className="form-control"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            className="form-control"
            value={form.assignedTo}
            onChange={handleChange}
            placeholder="Person responsible"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {form.id === null ? "Add Task" : "Update Task"}
        </button>

        {form.id !== null && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setForm({
                id: null,
                title: "",
                description: "",
                deadline: "",
                assignedTo: "",
                status: "Pending",
              })
            }
          >
            Cancel
          </button>
        )}
      </form>

      {/* Search and Sort */}
      <div className="mb-3 d-flex flex-wrap align-items-center gap-3">
        <input
          type="text"
          placeholder="Search tasks..."
          className="form-control"
          style={{ maxWidth: "250px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          Sort by:{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => handleSortChange("title")}
          >
            Title {sortField === "title" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>{" "}
          |{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => handleSortChange("deadline")}
          >
            Deadline {sortField === "deadline" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>{" "}
          |{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => handleSortChange("status")}
          >
            Status {sortField === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
        </div>

        <button className="btn btn-success ms-auto" onClick={generatePDF}>
          Download PDF Report
        </button>
      </div>


      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Assigned To</th>
                <th>Status</th>
                <th style={{ minWidth: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.deadline}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
