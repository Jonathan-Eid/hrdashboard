import { useState } from 'react'
import './App.css'
import thetaLogo from '/theta.svg'
import 'bulma/css/bulma.min.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      <div style={{ bottom:"30vh", position:"relative"}}>
          <img style={{ left:"40%", position:"relative"}} width={"100"} src={thetaLogo}></img>
          <h1>Theta Resources Lab </h1>
      </div>
      {!isLoggedIn && 
        <div style={{ bottom:"10vh", position:"relative"}}>
          <button className='button' onClick={()=>{setIsLoggedIn(true)}}>Manage Employees</button>
        </div>}

        {isLoggedIn &&
        <div>
          <table className="table">
            <thead>
              <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Played">Pld</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Drawn">D</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Goals for">GF</abbr></th>
                <th><abbr title="Goals against">GA</abbr></th>
                <th><abbr title="Goal difference">GD</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                <th>Qualification or relegation</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th>Team</th>
                <th><abbr title="Played">Pld</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Drawn">D</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Goals for">GF</abbr></th>
                <th><abbr title="Goals against">GA</abbr></th>
                <th><abbr title="Goal difference">GD</abbr></th>
                <th><abbr title="Points">Pts</abbr></th>
                <th>Qualification or relegation</th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <th>1</th>
                <td>
                  <a
                    href="https://en.wikipedia.org/wiki/Leicester_City_F.C."
                    title="Leicester City F.C."
                    >Leicester City</a>
                  <strong>(C)</strong>
                </td>
                <td>38</td>
                <td>23</td>
                <td>12</td>
                <td>3</td>
                <td>68</td>
                <td>36</td>
                <td>+32</td>
                <td>81</td>
                <td>
                  Qualification for the
                  <a
                    href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                    title="2016–17 UEFA Champions League"
                    >Champions League group stage</a
                  >
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>
                  <a
                    href="https://en.wikipedia.org/wiki/Arsenal_F.C."
                    title="Arsenal F.C."
                    >Arsenal</a>
                </td>
                <td>38</td>
                <td>20</td>
                <td>11</td>
                <td>7</td>
                <td>65</td>
                <td>36</td>
                <td>+29</td>
                <td>71</td>
                <td>
                  Qualification for the
                  <a
                    href="https://en.wikipedia.org/wiki/2016%E2%80%9317_UEFA_Champions_League#Group_stage"
                    title="2016–17 UEFA Champions League"
                    >Champions League group stage</a
                  >
                </td>
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
