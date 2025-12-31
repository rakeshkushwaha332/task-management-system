import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "../style/CreateTask.css";

export default function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/users")
      .then((res) => setUsers(res.data))
      .catch(() => alert("Failed to load users"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignedTo) {
      alert("Please assign the task to a user");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tasks", { ...task, assignedTo });
      alert("Task created successfully!");
      navigate("/admin-dashboard"); // ✅ FINAL REDIRECT
    } catch (err) {
      alert("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task-wrapper">
      <div className="create-task-card">
        <div className="create-task-header">
          <Link to="/admin-dashboard" className="back-link">
            ← Back to Dashboard
          </Link>
          <h2>Create New Task</h2>
          <p>Fill in the details below to stay organized</p>
        </div>

        <form onSubmit={handleSubmit} className="create-task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Finish Project Report"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              placeholder="Add some details..."
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={task.dueDate}
                onChange={(e) =>
                  setTask({ ...task, dueDate: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority Level</label>
              <select
                id="priority"
                value={task.priority}
                onChange={(e) =>
                  setTask({ ...task, priority: e.target.value })
                }
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">Assign To</label>
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="create-btn"
            disabled={loading}
          >
            {loading ? "Creating Task..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
