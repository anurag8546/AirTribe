import React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
  const { taskId, taskTitle } = useParams();

  const [title, setTitle] = useState(taskTitle);

    const navigate = useNavigate();
   
    
    const updateTask =  (taskId, title) => {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
    //   console.log(tasks);
        if (!tasks || typeof tasks !== 'object' || !Array.isArray(tasks['Not Started']) || !Array.isArray(tasks['In Progress']) || !Array.isArray(tasks['Completed'])) {
          console.error('Tasks is not an object array:', tasks);
          tasks = { 'Not Started': [], 'In Progress': [], 'Completed': [] };
        }
      
        const updatedTask = { id: taskId, title: title }; 
        // console.log(updatedTask);
        // console.log(taskId);
        const updatedTasks = {
          'Not Started': tasks['Not Started'].map((task) =>
            task.id == (taskId) ? updatedTask: task
          
          ),
          'In Progress': tasks['In Progress'].map((task) =>
            task.id == (taskId) ? updatedTask : task
          ),
          'Completed': tasks['Completed'].map((task) =>
            task.id == (taskId) ? updatedTask : task
          ),
        };
        // console.log("jijijij");
        // console.log(updatedTasks);
         localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      };
      
      const deleteTask = (taskId) => {
          let tasks = JSON.parse(localStorage.getItem('tasks'));
      
          if (!tasks || typeof tasks !== 'object' || !Array.isArray(tasks['Not Started']) || !Array.isArray(tasks['In Progress']) || !Array.isArray(tasks['Completed'])) {
            console.error('Tasks is not an object array:', tasks);
            tasks = { 'Not Started': [], 'In Progress': [], 'Completed': [] };
          }
      
          const updatedTasks = {
            'Not Started': tasks['Not Started'].filter((task) => task.id != (taskId)),
            'In Progress': tasks['In Progress'].filter((task) => task.id != (taskId)),
            'Completed': tasks['Completed'].filter((task) => task.id != (taskId)),
          };
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      };

      const handleUpdate = () => {
        updateTask(taskId, title)         
            navigate('/');
      };


      const handleDelete = () => {
        deleteTask(taskId)
            navigate('/');
      };
    
 useEffect(() => {
    setTimeout(() => {
      const fakeTaskDetails = {
        id: taskId,
        title: taskTitle,
      };
      setTitle(fakeTaskDetails.title);
    }, 500);
  }, [taskId], [title]);

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