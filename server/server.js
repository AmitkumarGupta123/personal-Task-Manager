const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database Connection
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.log("Database Error:", err.message);
  } else {
    console.log("Connected to SQLite Database");
  }
});

// Create Table
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  dueDate TEXT,
  completed INTEGER DEFAULT 0
)
`);

// Get All Tasks
app.get("/api/tasks", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(rows);
  });
});

// Add Task
app.post("/api/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;

  db.run(
    "INSERT INTO tasks(title, description, dueDate) VALUES (?, ?, ?)",
    [title, description, dueDate],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        message: "Task Added Successfully",
      });
    }
  );
});

// Update Task
app.put("/api/tasks/:id", (req, res) => {
  const { title, description, dueDate } = req.body;

  db.run(
    "UPDATE tasks SET title=?, description=?, dueDate=? WHERE id=?",
    [title, description, dueDate, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Task Updated Successfully",
      });
    }
  );
});

// Delete Task
app.delete("/api/tasks/:id", (req, res) => {
  db.run(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Task Deleted Successfully",
      });
    }
  );
});

// Toggle Complete / Incomplete
app.patch("/api/tasks/:id", (req, res) => {
  db.get(
    "SELECT completed FROM tasks WHERE id=?",
    [req.params.id],
    (err, task) => {
      if (err) {
        return res.status(500).json(err);
      }

      const newStatus = task.completed === 1 ? 0 : 1;

      db.run(
        "UPDATE tasks SET completed=? WHERE id=?",
        [newStatus, req.params.id],
        function (err) {
          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "Status Updated",
          });
        }
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});