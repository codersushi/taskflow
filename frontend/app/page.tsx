
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
  const [loaded, setLoaded] = useState(false);

  // Form input states
  const [title, setTitle] = useState("");
  const [type, setType] = useState("HW");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const bubbles = [
    { left: '8%', size: 6, duration: 14, delay: 0 },
    { left: '15%', size: 10, duration: 18, delay: 3 },
    { left: '24%', size: 4, duration: 12, delay: 1 },
    { left: '33%', size: 8, duration: 16, delay: 5 },
    { left: '42%', size: 5, duration: 13, delay: 2 },
    { left: '51%', size: 12, duration: 20, delay: 4 },
    { left: '60%', size: 6, duration: 15, delay: 1 },
    { left: '68%', size: 9, duration: 17, delay: 6 },
    { left: '77%', size: 4, duration: 11, delay: 2 },
    { left: '85%', size: 11, duration: 19, delay: 3 },
    { left: '92%', size: 7, duration: 14, delay: 5 },
    { left: '19%', size: 5, duration: 15, delay: 7 },
    { left: '47%', size: 7, duration: 16, delay: 8 },
    { left: '73%', size: 5, duration: 13, delay: 4 },
  ];

  // --- EFFECTS ---

  // Load from LocalStorage on first boot
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        setTasks([]);
      }
    }

    setLoaded(true);
    loadQuote();
  }, []);

  // Save to LocalStorage whenever tasks change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  // Fetch Quote
  async function loadQuote() {
    try {
      const res = await fetch("https://api.quotable.io/random");

      if (!res.ok) {
        throw new Error("Failed to fetch quote");
      }

      const data = await res.json();
      setQuote(`"${data.content}" — ${data.author}`);
    } catch {
      setQuote("Discipline beats motivation.");
    }
  }

  // --- ACTIONS ---

  const addTask = () => {
    if (!title.trim() || !dueDate) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      type,
      dueDate,
      priority
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setTitle("");
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter(t =>
    currentFilter === "All" || t.type === currentFilter
  );

  return (
    <div className="container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Rubik', sans-serif;
          background-color: #08142b;
          color: #f0f9ff;
        }

        .container {
          position: relative;
          overflow-x: hidden;
          min-height: 100vh;
          width: 100%;
          padding: 40px 20px;
          background-color: #08142b;
          background-image:
            radial-gradient(ellipse 60% 45% at 50% 4%, rgba(165, 243, 252, 0.92) 0%, rgba(34, 211, 238, 0.6) 32%, rgba(2, 132, 199, 0.25) 65%, transparent 100%),
            radial-gradient(circle at 50% 15%, #0369a1 0%, #0d2147 62%, #08142b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes swayRay {
          0%, 100% {
            transform: rotate(-14deg) translateX(0px) scaleY(1);
            opacity: 0.32;
          }
          50% {
            transform: rotate(-10deg) translateX(25px) scaleY(1.06);
            opacity: 0.5;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(105vh) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          50% {
            transform: translateY(50vh) translateX(15px);
          }
          85% {
            opacity: 0.55;
          }
          100% {
            transform: translateY(-10vh) translateX(-10px);
            opacity: 0;
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sunbeam {
          position: fixed;
          top: -15%;
          width: 140px;
          height: 120vh;
          background: linear-gradient(
            180deg,
            rgba(186, 230, 253, 0.55) 0%,
            rgba(56, 189, 248, 0.18) 50%,
            transparent 100%
          );
          filter: blur(28px);
          transform-origin: top center;
          pointer-events: none;
          animation: swayRay 9s ease-in-out infinite;
          z-index: 0;
        }

        .bubble {
          position: fixed;
          bottom: -20px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.85),
            rgba(186, 230, 253, 0.25) 60%,
            rgba(56, 189, 248, 0.1) 100%
          );
          box-shadow: 0 0 8px rgba(125, 211, 252, 0.4);
          pointer-events: none;
          animation: floatUp linear infinite;
          z-index: 0;
        }

        header, .quote-card, .input-card, .filters, #taskList {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 720px;
        }

        header {
          text-align: center;
          margin-bottom: 24px;
        }

        header h1 {
          margin: 0 0 6px 0;
          font-size: 2.6rem;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 16px rgba(34, 211, 238, 0.65);
        }

        header .subtitle {
          margin: 0;
          font-size: 1rem;
          color: #e0f2fe;
          opacity: 0.95;
        }

        .quote-card {
          background: rgba(13, 33, 71, 0.45);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(186, 230, 253, 0.25);
          border-radius: 16px;
          padding: 18px 22px;
          margin-bottom: 20px;
          text-align: center;
          font-style: italic;
          color: #e0f2fe;
          box-shadow: 0 8px 24px rgba(8, 20, 43, 0.35);
        }

        .input-card {
          background: rgba(13, 33, 71, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(186, 230, 253, 0.25);
          border-radius: 16px;
          padding: 18px;
          margin-bottom: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(8, 20, 43, 0.35);
        }

        .input-card input,
        .input-card select {
          font-family: 'Rubik', sans-serif;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid rgba(186, 230, 253, 0.3);
          background: rgba(8, 20, 43, 0.55);
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
        }

        .input-card input[type="text"] {
          flex: 2;
          min-width: 180px;
        }

        .input-card input::placeholder {
          color: rgba(186, 230, 253, 0.65);
        }

        .input-card input:focus,
        .input-card select:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.25);
        }

        .input-card select option {
          background-color: #0d2147;
          color: #ffffff;
        }

        .input-card input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        .input-card button {
          font-family: 'Rubik', sans-serif;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #0284c7, #06b6d4);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .input-card button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(6, 182, 212, 0.45);
        }

        .filters {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 22px;
        }

        .filters button {
          font-family: 'Rubik', sans-serif;
          padding: 8px 18px;
          border-radius: 20px;
          border: 1px solid rgba(186, 230, 253, 0.3);
          background: rgba(13, 33, 71, 0.45);
          backdrop-filter: blur(8px);
          color: #e0f2fe;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filters button:hover {
          background: rgba(2, 132, 199, 0.55);
          border-color: #38bdf8;
          color: #ffffff;
        }

        .filters button.active {
          background: rgba(2, 132, 199, 0.7);
          border-color: #38bdf8;
          color: #ffffff;
        }

        #taskList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        #taskList li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-radius: 14px;
          background: rgba(13, 33, 71, 0.55);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(186, 230, 253, 0.2);
          color: #ffffff;
          animation: fadeSlideIn 0.3s ease forwards;
          box-shadow: 0 6px 20px rgba(8, 20, 43, 0.35);
        }

        #taskList li.low {
          border-left: 6px solid #34d399;
        }

        #taskList li.medium {
          border-left: 6px solid #fbbf24;
        }

        #taskList li.high {
          border-left: 6px solid #f87171;
        }

        .task-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .task-info strong {
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
        }

        .task-info span {
          font-size: 0.88rem;
          color: #bae6fd;
        }

        .task-info small {
          font-size: 0.8rem;
          color: #7dd3fc;
          opacity: 0.9;
        }

        #taskList li button {
          background: rgba(248, 113, 113, 0.2);
          border: 1px solid rgba(248, 113, 113, 0.4);
          color: #fecaca;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease, color 0.2s ease;
        }

        #taskList li button:hover {
          background: rgba(239, 68, 68, 0.65);
          color: #ffffff;
        }

        .empty-state {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 720px;
          padding: 24px;
          text-align: center;
          color: #bae6fd;
          background: rgba(13, 33, 71, 0.4);
          border: 1px solid rgba(186, 230, 253, 0.2);
          border-radius: 14px;
        }

        @media (max-width: 600px) {
          .container {
            padding: 30px 14px;
          }

          header h1 {
            font-size: 2.1rem;
          }

          .input-card {
            flex-direction: column;
          }

          .input-card input,
          .input-card select,
          .input-card button {
            width: 100%;
          }

          .filters {
            flex-wrap: wrap;
          }

          #taskList li {
            padding: 14px;
          }
        }
      `}</style>

      {/* Background effects */}
      <div
        className="sunbeam"
        style={{ left: '28%', animationDelay: '0s' }}
      />

      <div
        className="sunbeam"
        style={{ left: '46%', width: '200px', animationDelay: '-3s' }}
      />

      <div
        className="sunbeam"
        style={{ left: '63%', width: '110px', animationDelay: '-6s' }}
      />

      {bubbles.map((b, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Header */}
      <header>
        <h1>TaskFlow</h1>
        <p className="subtitle">
          Homework and Classwork Tracker
        </p>
      </header>

      {/* Quote */}
      <div className="quote-card">
        {quote}
      </div>

      {/* Task Input */}
      <div className="input-card">
        <input
          type="text"
          placeholder="Assignment name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="HW">Homework</option>
          <option value="CW">Classwork</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={currentFilter === "All" ? "active" : ""}
          onClick={() => setCurrentFilter("All")}
        >
          All
        </button>

        <button
          className={currentFilter === "HW" ? "active" : ""}
          onClick={() => setCurrentFilter("HW")}
        >
          Homework
        </button>

        <button
          className={currentFilter === "CW" ? "active" : ""}
          onClick={() => setCurrentFilter("CW")}
        >
          Classwork
        </button>
      </div>

      {/* Task List */}
      <ul id="taskList">
        {filteredTasks.map((task, index) => (
          <li
            key={task.id}
            className={task.priority.toLowerCase()}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="task-info">
              <strong>{task.title}</strong>

              <span>
                {task.type === "HW" ? "Homework" : "Classwork"}
                {" • "}Due {task.dueDate}
              </span>

              <small>
                Priority: {task.priority}
              </small>
            </div>

            <button
              onClick={() => deleteTask(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <div className="empty-state">
          No tasks yet. Add your first assignment!
        </div>
      )}
    </div>
  );
}
