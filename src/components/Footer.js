// use rafce

// this componenet and About.js are used in Routing

import { Link } from 'react-router-dom'         // this {Link} hook is used so that when we click on 'About' link
                                                // it doesn't refresh/load the page

const Footer = () => {
  return (
    <footer>
        <p>Copyright &copy; 2024 </p>
        <Link to="/about">About</Link>           
        </footer>                          // instead of <a href = ""></a> we are using <Link to = ""></Link>
  )
}

export default Footer