// use rafce

// this componenet and Footer.js are used in Routing

import { Link } from 'react-router-dom'              // this {Link} hook is used so that when we click on 'Go Back' link
                                                     // it doesn't refresh/load the page

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <Link to = "/">Go Back</Link>                
    </div>                                         // Instead of <a href = ""></a> we are using <Link to = ""></Link>
                                                   // Note: Instead of "/" you can also use "http://localhost:3000"
  )
}

export default About