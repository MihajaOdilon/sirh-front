import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"
import FetchAll from '../../../API/GetAll';

export default function ListEmployees() {
    const context = useContext(ContextUrl);
    const [employees,setEmployees] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(context.url + 'employees',{params:{
                "page" : 0
            }})
            .then(({data})=>setEmployees(data))
        }
        fetchData();
    },[context])
    useEffect(()=>{
        $(document).on('input',"#search", function(e){
            const val = e.target.value
            if(val!==''){
                axios.get(context.url+"employees/search", {params:{
                    "page":0,
                    "name":val
                }})
                .then(({data})=>{
                    setEmployees(data)
                })
            }
            else{
                axios.get(context.url + 'employees',{params:{
                    "page" : 0
                }})
                .then(({data})=>setEmployees(data))
            }
        });
        return ()=>{
            $(document).off("input","#search");
        }
    },[context])
    return (
        <>
        <div className='container-fluid  list'>
            <table className='table'>
                <thead>
                    <tr className=''>
                        <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                        <th scope='col'>Nom</th>
                        <th scope='col' colSpan={2}>Emploi</th>
                    </tr>
                </thead>
                <tbody>
                        {employees.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                            employees.map((employee,index)=>{
                            return(
                            <tr key={employee.id}>
                                <th scope='row'>
                                    <input type={"checkbox"} value={employee.id} className='form-check-input'/>
                                </th>
                                <td value={employee.id}>
                                    {
                                        <NavLink to={employee.id + "/about"} className={"text-decoration-none"}>{employee.person.name +" "+ employee.person.firstname}</NavLink>
                                    }
                                </td>
                                <td>{employee.job.name}</td>
                            </tr>
                            )})
                        }
                </tbody>
            </table>  
        </div>
        </>
    )
}


