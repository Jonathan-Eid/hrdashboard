
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers:{
        "Cache-Control": "no-cache"
    }
})

export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    salary:number,
    department: {
        id: number,
        name: string
    },
    position:{
        id: number,
        name: string
    },
    status: boolean

}

export interface EmployeeResponse {
    totalItems: number,
    employees: Employee[],
    totalPages: number,
    currentPage: number

}


export async function getEmployees(department?: string, status?: string,page=0) {


    try{
        const response = await api.get(`/employees`,{
            params: {
                department,
                status,
                page
            }
        }) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function addEmployee(employee:any) {

    try{
        const response = await api.post(`/employees`,employee) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function updateEmployee(employee:any) {

    try{
        const response = await api.put(`/employees`,employee) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function deleteEmployee(employeeId:any) {

    try{
        const response = await api.delete(`/employees`,{data:{employeeId}}) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}


export async function getDepartments() {

    try{
        const response = await api.get(`/departments`) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export async function getPositions() {


    try{
        const response = await api.get(`/positions`) 
        return response.data
    } catch (error) {
        console.log(error)
    }

}

