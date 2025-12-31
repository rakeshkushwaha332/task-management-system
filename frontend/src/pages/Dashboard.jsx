import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import TaskDetails from "./TaskDetails";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const priorityMap = { high: 1, medium: 2, low: 3 };

  const applySorting = (taskList) => {
    if (!taskList) return [];
    return [...taskList].sort((a, b) => {
      const priorityA = priorityMap[a.priority] || 3;
      const priorityB = priorityMap[b.priority] || 3;
      return priorityA - priorityB;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks?page=${page}&limit=5`);
      const sorted = applySorting(res.data.tasks);
      setTasks(sorted);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert("Failed to delete task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/status`, { status });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const updatePriority = async (taskId, newPriority) => {
    try {
      const res = await api.patch(`/tasks/${taskId}/priority`, { priority: newPriority });
      setTasks((prev) => {
        const updated = prev.map((task) => (task._id === taskId ? res.data : task));
        return applySorting(updated);
      });
    } catch (error) {
      alert("Failed to update priority");
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Modal */}
      {selectedTaskId && (
        <div className="modal-overlay" onClick={() => setSelectedTaskId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedTaskId(null)}>
              × Close
            </button>
            <TaskDetails id={selectedTaskId} />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1>Task Management</h1>
          <p>Manage your daily productivity efficiently</p>
        </div>
        <div className="header-actions">
          <Link to="/create-task" className="create-btn">
            + New Task
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned To</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "3rem" }}>
                  Loading tasks...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="no-tasks"
                  style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📋</div>
                  <strong>No tasks found</strong>
                  <p>Create your first task to get started!</p>
                  <Link
                    to="/create-task"
                    className="create-btn"
                    style={{ display: "inline-block", marginTop: "1rem" }}
                  >
                    + New Task
                  </Link>
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id}>
                  {/* Full title cell colored by priority */}
                  <td className={`task-title-cell priority-${task.priority}`}>
                    <div className="task-title-text">{task.title}</div>
                  </td>

                  <td>
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "No due date"}
                  </td>

                  <td>
                    <select
                      className="status-select"
                      value={task.status}
                      onChange={(e) => updateStatus(task._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  <td>
                    <select
                      className="priority-badge"
                      value={task.priority}
                      onChange={(e) => updatePriority(task._id, e.target.value)}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </td>

                  <td>{task.assignedTo ? task.assignedTo.name : "Unassigned"}</td>

                  <td className="action-links">
                    <button
                      onClick={() => setSelectedTaskId(task._id)}
                      className="view-link-btn"
                    >
                      View
                    </button>
                    <Link to={`/task/edit/${task._id}`} className="edit-link">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(task._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && tasks.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}