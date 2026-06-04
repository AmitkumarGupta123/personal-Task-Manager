import axios from "axios";

function TaskItem({
  task,
  fetchTasks,
}) {
  const deleteTask = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) return;

    await axios.delete(
      `http://localhost:5000/api/tasks/${task.id}`
    );

    fetchTasks();
  };

  const toggleStatus =
    async () => {
      await axios.patch(
        `http://localhost:5000/api/tasks/${task.id}`
      );

      fetchTasks();
    };

  return (
    <div
      className={`task-card ${
        task.completed
          ? "completed"
          : ""
      }`}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <small>
        Due Date:
        {task.dueDate || " N/A"}
      </small>

      <div className="actions">
        <button
          onClick={toggleStatus}
        >
          {task.completed
            ? "Mark Active"
            : "Mark Complete"}
        </button>

        <button
          onClick={deleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;