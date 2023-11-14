import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import EditTask from './components/EditTask';
import './App.css'
const App = () => {
  const navigate = useNavigate();

  const status = ['Not Started', 'In Progress', 'Completed'];

  const loadTasksFromLocalStorage = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    return storedTasks || {
      'Not Started': [],
      'In Progress': [],
      'Completed': [],
    };
  };

  const [tasks, setTasks] = useState(loadTasksFromLocalStorage);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
    }
  }, [isUpdating]);

  const handleAddTask = (status) => {
    const title = prompt('Enter task title:');
    if (title !== null && title.trim() !== '') {
      setTasks((prevTasks) => {
        const newTask = { id: Date.now(), title: title.trim(), description: '' };
        const updatedTasks = { ...prevTasks, [status]: [...prevTasks[status], newTask] };
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
  };

  const fetchTaskDetails = (taskId) => {
    const task = Array.isArray(tasks)
      ? tasks.find((task) => task.id === parseInt(taskId))
      : null;
    return task || { id: '', title: '' };
  };

  const handleTaskUpdate = (taskId, taskTitle) => {
    const Searchtask = fetchTaskDetails(taskId);
    navigate(`/edit/${taskId}/${taskTitle}`);
  };

  const updateTaskTitle = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      Array.isArray(prevTasks)
        ? prevTasks.map((task) => (task.id === parseInt(taskId) ? { ...task, title: newTitle } : task))
        : prevTasks
    );
    setIsUpdating(true);
  };

  const handleDragStart = (e, status, taskId) => {
    e.dataTransfer.setData('status', status);
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const sourceStatus = e.dataTransfer.getData('status');
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
  //   console.log("SS");
  //   console.log(sourceStatus);
  //   console.log("TS");
  // console.log(targetStatus);
  // console.log("TI");
  // console.log(taskId);
    if (taskId!== undefined && !isNaN(taskId)) {

    if (!tasks[sourceStatus] || !tasks[targetStatus]) {
      console.error('Invalid source or target status:', sourceStatus, targetStatus);
      return;
    }  
    // Update the task status
    const updatedTasks = { ...tasks };
    console.log(updatedTasks);
    // Filter out the task from the sourceStatus
    updatedTasks[sourceStatus] = (updatedTasks[sourceStatus]).filter((task) => task.id != taskId);
    console.log(updatedTasks);
    // Ensure that updatedTasks[targetStatus] is an array
    updatedTasks[targetStatus] = Array.isArray(updatedTasks[targetStatus])
      ? [...updatedTasks[targetStatus], { ...tasks[sourceStatus].find((task) => task.id == taskId), isEditing: true }]
      : [{ ...tasks[sourceStatus].find((task) => task.id === taskId), isEditing: true }];
      console.log(updatedTasks);
    setTasks(updatedTasks);
  }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (

      <div className='mainDiv'>
        {status.map((status) => (
          <div
          className='status-column'
            key={status}
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={(e) => handleDragOver(e)}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', minWidth: '200px' }}
          >
            <h2>{status} ({tasks[status] ? tasks[status].length : 0})</h2>
            <button onClick={() => handleAddTask(status)}>New</button>
            {tasks[status] &&
              tasks[status].map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, status, task.id)}
                  onDoubleClick={() => handleTaskUpdate(task.id, task.title)}
                  style={{ border: '1px solid #ddd', padding: '8px', margin: '8px', cursor: 'pointer' }}
                >
                  {task.title}
                </div>
              ))}
          </div>
        ))}

        
      </div>
   
  );
};

export default App;
