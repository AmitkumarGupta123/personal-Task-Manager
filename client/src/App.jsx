import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";


function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return task.completed === 0;
    }

    if (filter === "completed") {
      return task.completed === 1;
    }

    return true;
  });

  const activeCount = tasks.filter(
    (task) => task.completed === 0
  ).length;

  const completedCount = tasks.filter(
    (task) => task.completed === 1
  ).length;



  return (

  <div className={darkMode ? "container dark" : "container"}>

    <div className="theme-toggle">
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>

    <h1>Personal Task Manager</h1>

    <TaskForm fetchTasks={fetchTasks} />

    <div className="stats">
      <p>Active Tasks: {activeCount}</p>
      <p>Completed Tasks: {completedCount}</p>
    </div>

    <FilterBar
      filter={filter}
      setFilter={setFilter}
    />

    <TaskList
      tasks={filteredTasks}
      fetchTasks={fetchTasks}
    />
  </div>

  );
}

export default App;