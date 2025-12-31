import { useEffect, useState } from "react";
import api from "../services/api";

export default function TaskDetails({ id }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${id}`);
      setTask(res.data);
    } catch (error) {
      console.error("Error fetching task details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="task-details-loading">
        <div className="spinner"></div>
        <p>Loading task details...</p>
      </div>
    );
  }

  if (!task) {
    return <div className="task-details-error">Task not found.</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "priority-low";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed": return "status-completed";
      case "in-progress": return "status-in-progress";
      case "pending": return "status-pending";
      default: return "status-pending";
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <h2 className="task-title">{task.title}</h2>
      </div>

      <div className="task-details-body">
        <div className="detail-item">
          <span className="detail-label">Description</span>
          <p className="detail-value description">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="detail-item">
          <span className="detail-label">Due Date</span>
          <p className="detail-value">{formatDate(task.dueDate)}</p>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status</span>
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {task.status.replace("-", " ").toUpperCase()}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Priority</span>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority.toUpperCase()}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Assigned To</span>
          <p className="detail-value assignee">
            {task.assignedTo
              ? `${task.assignedTo.name} (${task.assignedTo.email})`
              : "Unassigned"}
          </p>
        </div>
      </div>
    </div>
  );
}