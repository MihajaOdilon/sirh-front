import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"
import FetchAll from '../../../API/GetAll';

export default function ListEmployees() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate();
    const [ids, setIds] = useState([]);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [employees,setEmployees] = useState([]);
    const [employeeId,setemployeeId] = useState([])
    const [jobs] = FetchAll(context.url+"jobs");
    const [msg,setMsg] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(context.url + 'employees',{params:{
                "page" : 0
            }})
            .then(({data})=>setEmployees(data))
        }
        fetchData();
    },[msg,context])
    // useEffect(()=>{
    //     $(document).on('input',"#search", function(e){
    //         const val = e.target.value
    //         if(val!==''){
    //             axios.get(context.url+"employees/search", {params:{
    //                 "name":val
    //             }})
    //             .then(({data})=>{
    //                 setemployees(data)
    //             })
    //         }
    //         else{
    //             axios.get(context.url + 'employees')
    //             .then(({data})=>setemployees(data))
    //         }
    //     });
    //     return ()=>{
    //         $(document).off("input","#search");
    //     }
    // },[context])
    const updateIds = (e) => {
        let idsTemp = ids;
        if(e.target.checked){
            idsTemp.push(e.target.value);
        }
        else{
            let pos = idsTemp.indexOf(e.target.value);
            if(pos >= 0 && pos < idsTemp.length){
                idsTemp.splice(pos, 1);
            }
        }
        setIds(idsTemp);
        setDeleteDisabled(ids.length === 0);
    }
    return (
        <>
        <div className="modal fade" id='delete__employee' tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Suppression</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Voulez-vous supprimer vraiment la sélection ?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Supprimer</button>
                </div>
                </div>
            </div>
        </div>
        <div className='container-fluid  list'>
        {msg && <div className='alert bg-danger'>{msg}</div>}
            <table className='table'>
                <thead>
                    <tr className=''>
                        <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                        <th scope='col'>Nom</th>
                        <th scope='col' colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {employees.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                            employees.map((employee,index)=>{
                            return(
                            <tr key={employee.id}>
                                <th scope='row'>
                                    <input type={"checkbox"} value={employee.id} onChange={ updateIds } className='form-check-input'/>
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
        <MenuBar deleteDisabled={deleteDisabled}/>  
        </>
    )
}


