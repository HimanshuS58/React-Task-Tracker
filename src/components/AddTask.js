// use rafce

                                             /*   Very Imp    */

import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()    // to prevent submitting to a page

        if(!text) {
            alert('Please add a task')
            return
        }

        onAdd({text, day, reminder})

// We are calling below functions so that after onsubmitting, the form field return to its 
// default state(or the state in which we want)
        setText('')
        setDay('')
        setReminder(false)
    }
    

  return (
    <form className="add-form" onSubmit = {onSubmit}>

        <div className = 'form-control'>
            <label>Task</label>
            <input 
            type="text" 
            placeholder = 'Add Task' 
            value = {text} 
            onChange = {(e) => setText(e.target.value)}
            />
        </div>

        <div className = 'form-control'>
            <label>Day & Time</label>
            <input 
            type="text" 
            placeholder = 'Add Day & Time' 
            value = {day}
            onChange = {(e) => setDay(e.target.value)}
            />
        </div>

        <div className = 'form-control form-control-check'>
            <label>Set Reminder</label>
            <input 
            type="checkbox"
            checked = {reminder} 
            // value = {reminder}
            onChange = {(e) => setReminder(e.currentTarget.checked)}
            />
        </div>

        <input type="submit" value = 'Save Task' className = 'btn btn-block' />

    </form>
  )
}

export default AddTask