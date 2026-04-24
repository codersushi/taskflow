'use client';

import React, { useState, useEffect } from 'react';

// Define the shape of a task for TypeScript
interface Task {
  id: number;
  title: string;
  type: string;
  dueDate: string;
  priority: string;
}

export default function TaskFlow() {
  // --- STATE ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState("All");
  const [quote, setQuote] = useState("Loading inspiration...");
  
  // Form input states
  const [title, setTitle] = useState("");
  const [type, setType] = useState("HW");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  // --- EFFECTS ---

  // Load from LocalStorage on first boot
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    loadQuote();
  }, []);

  // Save to LocalStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Fetch Quote
  async function loadQuote() {
    try {
      const res = await fetch("https://api.quotable.io/random");
      const data = await res.json();
      setQuote(`"${data.content}" — ${data.author}`);
    } catch {
      setQuote("Discipline beats motivation.");
    }
  }

  // --- ACTIONS ---

  const addTask = () => {
    if (!title || !dueDate) return;

    const newTask: Task = {
      id: Date.now(),
      title,
      type,
      dueDate,
      priority
    };

    setTasks([newTask, ...tasks]); // unshift equivalent
    setTitle(""); // Clear input
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter(t => 
    currentFilter === "All" || t.type === currentFilter
  );

  return (
    <div className="container">
      <div className="bg-glow"></div>

      <header>
        <h1>TaskFlow</h1>
        <p className="subtitle">Homework and Classwork Tracker</p>
      </header>

      <div id="quote" className="quote-card">{quote}</div>

      <div className="input-card">
        <input 
          type="text" 
          placeholder="Assignment name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="HW">Homework</option>
          <option value="CW">Classwork</option>
        </select>

        <input 
          type="date" 
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="filters">
        <button onClick={() => setCurrentFilter('All')}>All</button>
        <button onClick={() => setCurrentFilter('HW')}>Homework</button>
        <button onClick={() => setCurrentFilter('CW')}>Classwork</button>
      </div>

      <ul id="taskList">
        {filteredTasks.map((task, index) => (
          <li 
            key={task.id} 
            className={task.priority.toLowerCase()}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="task-info">
              <strong>{task.title}</strong>
              <span>{task.type} • Due {task.dueDate}</span>
              <small>Priority: {task.priority}</small>
            </div>
            <button onClick={() => deleteTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}