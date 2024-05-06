// use rafce

import PropTypes from 'prop-types'      // for practice
import Button from './Button'

import { useLocation } from 'react-router-dom'      // this hook is used so that when you click on 'About' link
                                                    // the "Add" button didn't show up.

const Header = ({ title, onAdd, showAdd }) => {     
  // const onClick = () => {
  //   console.log('click')                 // <--- for practice
  // }  

   const location = useLocation()  

  return (
    <header className = 'header'>
      {/* <h1 style = {headingStyles}> {title} </h1> */}
      {/* <h1 style = {{color: 'red', backgroundColor: 'black'}}> {title} </h1> */}

      <h1> {title} </h1>       {/* Note: Here we are not providing any value to title prop. 
                                         The title here is given using below 'Header.defaultProps' */}

                                         
      {location.pathname === '/' &&                          // "&&" is used in place of ternary (?) when (:) is empty.
          <Button 
                 color = {showAdd ? 'red' : 'green'} 
                 text = {showAdd ? 'Close' : 'Add'}
                 onClick = {onAdd}/>
      }

    </header>

  )
}

// for practice
Header.defaultProps = {
  title: 'Task Tracker'
}

// for practice
Header.propTypes = {                     // for this u have to "import PropTypes from 'prop-types'" <--- given above

  title: PropTypes.string.isRequired     // if we pass anything in title other than a string it will output that result
                                         // but will show warning/error in components(using f12) stating the mistake.
                                         // This is helpful in making your code more robust and catch error.
}

// CSS in JS <---- for practice
// const headingStyles = {
//   color: 'red',
//   backgroundColor: 'black'
// }


export default Header

