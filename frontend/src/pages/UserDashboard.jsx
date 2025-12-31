import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/Dashboard.css";

export default function UserDashboard() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    // Priority configuration
    const priorityColor = { high: "#fee2e2", medium: "#fef3c7", low: "#dcfce7" };
    const priorityText = { high: "#991b1b", medium: "#92400e", low: "#166534" };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks/my-tasks"); // user-specific tasks
            setTasks(res.data);
        } catch (err) {
            alert("Failed to load tasks");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div>
                    <h1>My Tasks</h1>
                    <p>Tasks assigned to you</p>
                </div>
                <div className="header-actions">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </header>

            <div className="table-container">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-tasks">No tasks assigned.</td>
                            </tr>
                        ) : (
                            tasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</td>
                                    <td>{task.status}</td>
                                    <td style={{
                                        backgroundColor: priorityColor[task.priority] || "#f3f4f6",
                                        color: priorityText[task.priority] || "#374151",
                                        fontWeight: "bold",
                                        textAlign: "center"
                                    }}>
                                        {task.priority}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
