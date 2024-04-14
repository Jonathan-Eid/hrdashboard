import { useState } from 'react'
import './App.css'
import thetaLogo from '/theta.svg'
import 'bulma/css/bulma.min.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <div style={{justifyContent: 'center', alignItems: 'center', width: "100%", textAlign: 'center'}}>
          <img width={"100"} style={{margin: "auto"}} src={thetaLogo}></img>
          <h1>Theta Resources Lab </h1>
      </div>
      {!isLoggedIn && 
        <div style={{paddingTop: "10vh"}}>
          <button className='button' onClick={()=>{setIsLoggedIn(true)}}>Manage Employees</button>
        </div>}

        {isLoggedIn &&
        <div style={{paddingTop: "10vh"}}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Ted Mosby</td>
                <td>38</td>
                <td>23</td>
                <td>12</td>
                <td>3</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Arnold Shwarz</td>
                <td>38</td>
                <td>20</td>
                <td>11</td>
                <td>7</td>
              </tr>

            </tbody>
          </table>
          <div style={{ }}>
            <button className='button' onClick={()=>{setIsLoggedIn(false)}}>Logout</button>
          </div>
        </div>}
    </>
  )
}

export default App
