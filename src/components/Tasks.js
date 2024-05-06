// use rafce

// import {useState} from 'react'           // useState is a hook <--- read it
import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle }) => {
    
  return (
    <>
    {tasks.map((task) => (                  // .map() <--- read it
        <Task 
        key = {task.id} 
        task = {task}                      // Note: the first task is the property inside <Task> componenet whereas  
                                           //       the second one is the parameter passed from tasks.map((task)).
        onDelete = {onDelete} 
        onToggle = {onToggle}                    
        />
            
            
        )                                 // 'key' prop <--- as in here map create/iterating though a list so each list should be
                                          //                 unique that's why key prop is used
                                          // Note: this 'key' prop is not mandatory but it will show error in console(f12)
        )}
    </>
  )
}

export default Tasks

