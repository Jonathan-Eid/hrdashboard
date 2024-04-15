import { useEffect, useState } from 'react'
import './App.css'
import thetaLogo from '/theta.svg'
import 'bulma/css/bulma.min.css';
import { Employee, EmployeeResponse, addEmployee, deleteEmployee, getDepartments, getEmployees, getPositions, updateEmployee } from './api';
import { cmpStr2Num, formatUSD, statusToActiveString } from './utils';
import {isEqualWith} from 'lodash'
import useConfirm from './hooks';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [employeeResponse, setEmployeeResponse] = useState<EmployeeResponse | undefined>(undefined)
  const [page, setPage] = useState<number>(0)

  const [departments, setDepartments] = useState<any | undefined>([])
  const [positions, setPositions] = useState<any | undefined>([])


  const [departmentFilter, setDepartmentFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")

  const [employeeAction, setEmployeeAction] = useState<string | undefined>(undefined)
  const [selectedEmployee, setSelectedEmployee] = useState<any>({})

  const [refreshState, setRefreshState] = useState(1)

  const defaultForm = {
    firstName: '',
    lastName: '',
    salary: '',
    status: 'true',
    departmentId: 1,
    positionId: 1
  }

  const [formState, setFormState] = useState<any>(defaultForm)

  const [ getConfirmation, Confirmation ] = useConfirm()


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormState((prevState:any) => ({
          ...prevState,
          [name]: value
      }));
  };


  useEffect(() => {

    if(isLoggedIn) {
      
      (async () => {
        const employeeData = await getEmployees(departmentFilter,statusFilter,page)
        setEmployeeResponse(employeeData)

        const departments = await getDepartments()
        setDepartments(departments)
        setFormState((prevState:any) => ({
          ...prevState,
          departmentId: departments[0].id
      }));

        const positions = await getPositions()
        setPositions(positions)
        setFormState((prevState:any) => ({
          ...prevState,
          positionId: positions[0].id
      }));

      })()
    }
    else{
      setEmployeeResponse(undefined)
      setDepartments([])
      setPositions([])
      setDepartmentFilter("")
      setStatusFilter("")
      setPage(0)
    }


  },[departmentFilter,statusFilter,page,isLoggedIn,refreshState])




  function isValidName(name: any){
    return name && name.length >= 2 && name.length <= 20
  }

  function isValidSalary(salary: any){
    return salary && salary >= 1000 && salary <= 1000000
  }

  function isValidForm(){
    return isValidName(formState.firstName) && isValidName(formState.lastName) && isValidSalary(formState.salary)
  }


  


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
        <div style={{paddingTop: "10vh", width:"100%",justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          {employeeResponse &&
          <div style={{width: "100vw"}} className="columns">
            <div className='column is-narrow'>
            <h4 className='title is-4'>Filter Options</h4>
              <div> 
                <h5 className='subtitle is-5'>Department</h5>
                <div className="select">
                  <select onChange={(e) => {
                    setPage(0)
                    setDepartmentFilter(e.target.value)
                  }}>
                    <option value={""}>All</option>
                    {departments.map((department:any) => {
                      return <option value={department.name}>{department.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <br></br>
              <div> 
                <h5 className='subtitle is-5'>Status</h5>
                <div className="select">
                  <select onChange={(e) => {
                      setPage(0)
                      setStatusFilter(e.target.value)
                    }}>
                    <option value={""}>All</option>
                    <option  value={"true"}>Active</option>
                    <option  value={"false"}>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
             
            <div className='column is-narrow'>
              <table className="table">
              <caption className='title'>Employees</caption>
              <caption className='subtitle'>Total Employees: {employeeResponse.totalItems}</caption>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                {employeeResponse.employees.map((employee:Employee) =>{
                  return <tr>
                    <th>{employee.id}</th>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.position.name}</td>
                    <td>{formatUSD(employee.salary)}</td>
                    <td>{statusToActiveString(employee.status)}</td>
                    <td> 
                      <button onClick={() => {
                        setSelectedEmployee({...employee, 
                          department: undefined,
                          position: undefined,
                          departmentId: employee.department.id, 
                          positionId: employee.position.id, 
                          status: employee.status.toString()})
                        setFormState({...employee, 
                          department: undefined,
                          position: undefined,
                          departmentId: employee.department.id, 
                          positionId: employee.position.id, 
                          status: employee.status.toString()})
                        setEmployeeAction('edit')
                      }} className="button is-small">Edit</button> 
                      <button onClick={async () => {
                        const status = await getConfirmation(`Are you sure you want to delete, Employee: ${employee.firstName} ${employee.lastName}, ID ${employee.id}`);
                        if (status){
                          await deleteEmployee(employee.id)
                          setRefreshState(refreshState+1)
                        }
                      }} className="button is-small">Delete</button>
                      {/* @ts-expect-error Server Component */}
                      <Confirmation />
                       </td>

                </tr>
                
                })}
                </tbody>
              </table>
              <div className='columns'>
                <div style={{marginRight: "50px"}} className='subtitle'>Page: {employeeResponse.currentPage+1} / {employeeResponse.totalPages > 0 ? employeeResponse.totalPages : 1 } </div>
                <button style={{marginRight: "5px"}} disabled={page<=0} className='button' onClick={()=>{setPage(page-1)}}>Back</button>
                <button className='button' disabled={page>=employeeResponse.totalPages-1} onClick={()=>{setPage(page+1)}}>Next</button>

              </div>
           </div>

           <div className='column is-narrow'>
            <button className='button' onClick={() => {
              setEmployeeAction("add")
            }}>Add Employee</button>
          </div>

          <div className={employeeAction ? "modal is-active is-clipped" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-content" style={{background: "rgba(200,200,200,.4)", padding: "100px"}}>
              <div>
                <div style={{marginBottom: "50px"}}>
                  <input
                    className={isValidName(formState['firstName']) ? "input is-primary": "input is-danger"} 
                    type="text"
                    placeholder="First Name"
                    value={formState['firstName']}
                    onChange={handleChange}
                    name='firstName'
                  />
                  {!isValidName(formState['firstName']) && <p className='has-text-danger'>First Name must be between 2 & 20 Characters</p>}
                  <input
                    className={isValidName(formState['lastName']) ? "input is-primary": "input is-danger"} 
                    type="text"
                    placeholder="Last Name"
                    value={formState['lastName']}
                    onChange={handleChange}
                    name='lastName'
                  />
                  {!isValidName(formState['lastName']) && <p className='has-text-danger'>Last Name must be between 2 & 20 Characters</p>}
                  <input
                    className={isValidSalary(formState['salary']) ? "input is-primary": "input is-danger"} 
                    type="number"
                    placeholder="Salary"
                    value={formState['salary']}
                    onChange={handleChange}
                    name='salary'
                  />
                  {!isValidSalary(formState['salary']) && <p className='has-text-danger'>Salary number must be between 1,000 & 1,000,000</p>}
                </div> 

                <div className='columns'>
                  <div className='column'>
                    <h5 className='subtitle is-5'>Department</h5>
                    <div className="select">
                      <select name='departmentId' value={formState.departmentId} onChange={handleChange}>
                            {departments.map((department:any) => {

                              return <option value={department.id}>{department.name}</option>
                            })}
                      </select>
                    </div>
                  </div>
                  
                  <div className='column'>
                    <h5 className='subtitle is-5'>Position</h5>
                    <div className="select">
                      <select name='positionId' value={formState.positionId} onChange={handleChange}>
                            {positions.map((position:any) => {
                              return <option value={position.id}>{position.name}</option>
                            })}
                      </select>
                    </div>
                  </div>  

                  <div className='column'>
                    <h5 className='subtitle is-5'>Status</h5>
                    <div className="select">
                      <select name='status' value={formState.status} onChange={handleChange}>
                        <option value={"true"}>Active</option>
                        <option value={"false"}>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div> 

                {employeeAction == "add" && <button className={isValidForm() ? 'button is-success' : "button is-dark"} disabled={!isValidForm()}
                                              onClick={async () => {
                                                await addEmployee(formState)
                                                setRefreshState(refreshState+1)
                                                setFormState(defaultForm)
                                                setEmployeeAction(undefined)
                                              }}>Save</button>}
                {employeeAction == "edit" && <button className={isValidForm() && !isEqualWith(formState,selectedEmployee,cmpStr2Num) ? 'button is-success' : "button is-dark"} disabled={!isValidForm() || isEqualWith(formState,selectedEmployee,cmpStr2Num)} 
                                              onClick={async () => {
                                                await updateEmployee(formState)
                                                setRefreshState(refreshState+1)
                                                setFormState(defaultForm)
                                                setEmployeeAction(undefined)
                                              }}>Update</button>}
                {employeeAction == "edit" && isValidForm() && isEqualWith(formState,selectedEmployee,cmpStr2Num) && <p className='has-text-warning'> Make Changes To Update Employee</p>} 

              </div> 

            </div>
            <button onClick={() => {
              setFormState(defaultForm)
              setEmployeeAction(undefined)
            }} className="modal-close is-large" aria-label="close"></button>
          </div>
          
          </div>
                    
          }

          <div>
            <button style={{margin: "auto"}} className='button' onClick={()=>{setIsLoggedIn(false)}}>Logout</button>
          </div>
        </div>}
    </> 
  )
}

export default App
