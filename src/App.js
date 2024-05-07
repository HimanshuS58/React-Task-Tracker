import { useState, useEffect } from 'react'        
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  // const [tasks, setTasks] = useState([       
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


  const [tasks, setTasks] = useState([])        

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])            
  



  // Fetch Tasks
  const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

    // console.log(data)    
    return data
  }



  // Add Task         <--- when there is json server/backend api
    const addTask = async (task) => {

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
  //   // console.log('delete', id)                        
  //   setTasks(tasks.filter((task) => task.id !== id))    
  // }  


  // Delete task <--- when there is json server/backend api
   const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`,            
                    {
                      method: 'DELETE'
                    })     

      setTasks(tasks.filter((task) => task.id !== id))     
  }  








  // Toggle Reminder         <--- when there was no json server/backend api
  // const toggleReminder = (id) => {
  //   // console.log(id)                                
  //   setTasks(tasks.map((task) => 
  //              task.id === id ? {...task, reminder: !task.reminder} : task)
  //           )
  // }
  


// Fetching a single task <---- to toggle/update the reminder
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)      
  const data = await res.json()

  return data

  }  

  // Toggle Reminder         <--- when there is json server/backend api
  const toggleReminder = async (id) => { 
    const taskToToggle = await fetchTask(id)         
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder} 

    // below we are updating in the server
    const res = await fetch(`http://localhost:5000/tasks/${id}`,        
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
               {showAddTask && <AddTask            
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
