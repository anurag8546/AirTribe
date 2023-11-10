import React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const { taskId, taskTitle } = useParams();

  // Use local state for simplicity, in a real app, fetch the data from an API
  const [title, setTitle] = React.useState(taskTitle);

    const navigate = useNavigate();
  const handleUpdate = () => {
    const updatedTask = {
      id: taskId,
      title: title,
    };
  
    const storedTasks = localStorage.getItem('tasks');
    let tasks = [];
  
    try {
      tasks = JSON.parse(storedTasks) || { 'Not Started': [], 'In Progress': [], 'Completed': [] };
    } catch (error) {
      console.error('Error parsing tasks from local storage:', error);
    }
  
    // Ensure tasks is an object array
    if (typeof tasks !== 'object' || !Array.isArray(tasks['Not Started']) ||  !Array.isArray(tasks['In Progress']) || !Array.isArray(tasks['Completed'])) {
      console.error('Tasks is not an object array:', tasks);
      tasks = { 'Not Started': [], 'In Progress': [], 'Completed': [] };
    }
  
    // Update the task in local storage
    const updatedTasks = {
      'Not Started': tasks['Not Started'].map((task) =>
        task.id === parseInt(taskId) ? updatedTask : task
      ),
      'In Progress': tasks['In Progress'].map((task) =>
        task.id === parseInt(taskId) ? updatedTask : task
      ),
      'Completed': tasks['Completed'].map((task) =>
        task.id === parseInt(taskId) ? updatedTask : task
      ),
    };
  
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
    console.log(`Updating task ${taskId} with new title: ${title}`);
    navigate('/');
  };
  




  const handleDelete = () => {
    
      const storedTasks = localStorage.getItem('tasks');
      let tasks = [];
    
      try {
        tasks = JSON.parse(storedTasks) || { 'Not Started': [], 'In Progress': [], 'Completed': [] };
      } catch (error) {
        console.error('Error parsing tasks from local storage:', error);
      }
    
      // Ensure tasks is an object array
      if (typeof tasks !== 'object' || !Array.isArray(tasks['Not Started']) ||  !Array.isArray(tasks['In Progress']) || !Array.isArray(tasks['Completed'])) {
        console.error('Tasks is not an object array:', tasks);
        tasks = { 'Not Started': [], 'In Progress': [], 'Completed': [] };
      }
    
      // Use Filter to Delete the task from the local storage
      const updatedTasks = {
        'Not Started': tasks['Not Started'].filter((task) =>
          task.id !== parseInt(taskId)
        ),
        'In Progress': tasks['In Progress'].filter((task) =>
          task.id !== parseInt(taskId)
        ),'Completed': tasks['Completed'].filter((task) =>
        task.id !== parseInt(taskId)
      ),
      };
    
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      console.log(`Deleted task ${taskId}`);
      navigate('/');
  };

// const handleDelete = () => {
//     // Fetch the current tasks from local storage
//     const storedTasks = localStorage.getItem('tasks');
//     let tasks = {};
  
//     try {
//       // Attempt to parse the storedTasks
//       tasks = JSON.parse(storedTasks) || { 'Not Started': [], 'In Progress': [], 'Completed': [] };
//     } catch (error) {
//       console.error('Error parsing tasks from local storage:', error);
//     }
  
//     // Ensure tasks is an object
//     if (typeof tasks !== 'object') {
//       console.error('Tasks is not an object:', tasks);
//       tasks = { 'Not Started': [], 'In Progress': [], 'Completed': [] };
//     }
  
//     // Remove the task from the local storage
//     const updatedTasks = {
//       'Not Started': tasks['Not Started'].filter((task) => task.id !== parseInt(taskId)),
//       'In Progress': tasks['In Progress'].filter((task) => task.id !== parseInt(taskId)),
//       'Completed': tasks['Completed'].filter((task) => task.id !== parseInt(taskId)),
//     };
  
//     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
//     console.log(`Deleting task ${taskId}`);
//   };
  

  // Simulating fetching task details on component mount
  React.useEffect(() => {
    setTimeout(() => {
      const fakeTaskDetails = {
        id: taskId,
        title: taskTitle, // Replace with actual task title
      };
      setTitle(fakeTaskDetails.title);
    }, 500);
  }, [taskId]);

  return (
    <div>
      <h1>Edit Task</h1>
      <p>Task ID: {taskId}</p>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
       
      </label>
      <button onClick={handleUpdate}>Update Task</button>
      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
};

export default EditTask;