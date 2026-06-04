import { useState } from "react";
import axios from "axios";

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          dueDate,
        }
      );

      setTitle("");
      setDescription("");
      setDueDate("");

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;