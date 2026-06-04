import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  fetchTasks,
}) {
  if (tasks.length === 0) {
    return (
      <h3 className="empty">
        No Tasks Found
      </h3>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          fetchTasks={fetchTasks}
        />
      ))}
    </div>
  );
}

export default TaskList;