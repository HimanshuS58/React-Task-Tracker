// This is the global state of this project

import { useState, useEffect } from 'react'         // the {useState} is a hook which is used to store/manage the state/data 
                                                    // within a function component(like: App()).

                                                    // the {useEffect} hook  is used to perform side effects in a component, 
                                                    // such as updating the document title, fetching data(in our case), or 
                                                    // subscribing to events.

                                                    // Normally "useEffect" is used when you want something to happen when  
                                                    // the page load.

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  // const [tasks, setTasks] = useState([        // Here useState() is used to store the default data
  //       {
  //           id: 1,
  //           text: 'Doctors Appointment',
  //           day: 'Feb 18th at 2:30pm',
  //           reminder: true
  //       },                                         // this array list is transferred to db.json file
  //       {
  //           id: 2,
  //           text: 'Meeting at school',
  //           day: 'Feb 18th at 1:30pm',
  //           reminder: true
  //       },
  //       {
  //           id: 3,
  //           text: 'Shopping',
  //           day: 'Feb 18th at 4:00pm',
  //           reminder: false
  //       }  
  //   ])


  const [tasks, setTasks] = useState([])           // Here useState() is used to store the default data in 'tasks' variable
                                                   // Note: It always use two variables:- One is to store the data
                                                   //                                     the other one is to update the data
                                                   // Note: Here tasks:- variable &
                                                   //            setTasks:- function



  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])            // this empty array '[]' is a dependency array <--- read it
  
  



  // Fetch Tasks
  const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

    // console.log(data)     // <--- for practice
    return data
  }






  // // Add Task     <--- when there was no json server/backend api
  // const addTask = (task) => {
  //   // console.log(task)                               // <-- for practice
  //   const id = Math.floor(Math.random() * 10000) + 1   // <--- for generating unique id <--- very imp step
                                                          
  //   const newTask = {id, ...task}

  //   setTasks([...tasks, newTask])
  // }  


  // Add Task         <--- when there is json server/backend api
    const addTask = async (task) => {
      // Note: Here we are not using 'id' variable to assign new id/key value to the new task because the server automatically
      //       assign the new id(unique key) to the new task which we are adding.  <--- check 'db.json' file 
      const res = await fetch(`http://localhost:5000/tasks`,
                                {
                                  method: 'POST',
                                  headers: {
                                     'Content-type': 'application/json'
                                  },
                                  body: JSON.stringify(task)
                                })

      const data = await res.json()
      
      setTasks([...tasks, data])
    }








  // // Delete task  <--- when there was no json server/backend api
  // const deleteTask = (id) => {
  //   // console.log('delete', id)                        // <-- for practice
  //   setTasks(tasks.filter((task) => task.id !== id))    // try 'task.id == id' and see the result, then you will understand.

                                                           // Note: .filter() returns result based on the condition defined 
                                                           //                 inside it.
  // }  


  // Delete task <--- when there is json server/backend api
   const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,            /* Here are fetching a particular task 
                                                                     that's why we are passing 'id' as a parameter  */
                    {
                      method: 'DELETE'
                    })     

      setTasks(tasks.filter((task) => task.id !== id))     // try 'task.id == id' and see the result, then you will understand.
  }  








  // Toggle Reminder         <--- when there was no json server/backend api
  // const toggleReminder = (id) => {
  //   // console.log(id)                                  // for practice
  //   setTasks(tasks.map((task) => 
  //              task.id === id ? {...task, reminder: !task.reminder} : task)
  //           )
  // }
  


// Fetching a single task <---- to toggle/update the reminder
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)       // Here are fetching a particular task 
                                                                     // that's why we are passing 'id' as a parameter
  const data = await res.json()

  return data

  }  

  // Toggle Reminder         <--- when there is json server/backend api
  // (to update in the server so that when you make any changes & load the page, it remains updated)
  const toggleReminder = async (id) => { 
    const taskToToggle = await fetchTask(id)         /* here we are fetching the passed task and converting it's reminder */
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder} 

    // below we are updating in the server
    const res = await fetch(`http://localhost:5000/tasks/${id}`,        /* here we are updating the json server */
                              {
                                method: 'PUT',
                                headers: {
                                  'Content-type': 'application/json'
                                },
                                body: JSON.stringify(updTask)
                              })

    const data = await res.json()

    setTasks(
              tasks.map((task) => 
                                 task.id === id ? {...task, reminder: data.reminder} : task))
                                             // Here we are setting reminder to the "data.reminder" and not '!task.reminder'
                                             // because the data that we are getting is the updated task, so whatever
                                             // that is true or false we're going to have here.
            
  }


  return (
    <Router>

    <div className="container">

     <Header 
       onAdd = {() => setShowAddTask(!showAddTask)}
       showAdd = {showAddTask}
       />

    <Routes>

      <Route
            path = "/"               
            element = {
              <>
               {showAddTask && <AddTask             // "&&" is a shorter way of doing ternary(?) without else (:)
                                                    // i.e. it is used in place of 
                                                    // {showAddTask ? <AddTask /> : ''}

                                                    // Note: Use "&&" when the else(:) part is empty, otherwise use (?). 
      onAdd = {addTask}
      />}


     {tasks.length > 0 ? <Tasks                   
        tasks = {tasks}
        onDelete = {deleteTask}
        onToggle = {toggleReminder}
        /> : 'No Tasks To Show'}

              </>
            } 
      />
    
    <Route path = "/about" element = {<About />} />
     </Routes>

    <Footer />    
    </div>
    
    </Router>
  );
}

export default App;
