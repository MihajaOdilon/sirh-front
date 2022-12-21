import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"
import FetchAll from '../../../API/GetAll';

export default function ListesDepartments() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate();
    const [ids, setIds] = useState([]);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [departments,setDepartments] = useState([]);
    const [departmentId,setDepartmentId] = useState([])
    const [jobs] = FetchAll(context.url+"jobs");
    const [msg,setMsg] = useState([]);
    useEffect(()=>{
        console.log(departmentId+"ht")
    },[departmentId])
    useEffect(()=>{
        async function fetchData(){
            await axios.get(context.url + 'departments')
            .then(({data})=>setDepartments(data))
            .catch(err=>console.log(err))
        }
        fetchData();
    },[msg,context])
    useEffect(()=>{
        $(document).on('input',"#search", function(e){
            const val = e.target.value
            if(val!==''){
                axios.get(context.url+"departments/search", {params:{
                    "name":val
                }})
                .then(({data})=>{
                    setDepartments(data)
                })
            }
            else{
                axios.get(context.url + 'departments')
                .then(({data})=>setDepartments(data))
            }
        });
        return ()=>{
            $(document).off("input","#search");
        }
    },[context])
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
    const confirmDelete = () => {
        axios.delete(context.url+"departments/"+departmentId)
        .then(({data})=>{
            setMsg(data);
            setTimeout(() => {
                setMsg([]);
            }, 1500);
        })
    }
    return (
        <>
        <div className="modal fade" id='delete__department' tabIndex="-1">
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
                    <button type="button" className="btn btn-primary" onClick={ confirmDelete } data-bs-dismiss="modal">Supprimer</button>
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
                        {departments.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                            departments.map((department,index)=>{
                            const length = department.jobs.length;
                            const disabled = department.jobs.length!==0?true:false
                            const percent = ((length*100)/jobs.length).toFixed(2);
                            let classname =""
                            if(percent<25){
                                classname = "percent bg-danger";
                            }
                            else if(percent>=25 && percent<50){
                                classname = "percent bg-warning"
                            }
                            else if(percent>=50 && percent<=100){
                                classname = "percent bg-success"
                            }
                            return(
                            <tr key={department.id}>
                                <th scope='row'>
                                    <input type={"checkbox"} disabled={department.jobs.length!==0?true:false} value={department.id} onChange={ updateIds } className='form-check-input'/>
                                </th>
                                <td value={department.id}>
                                    {department.name}
                                    {length!==0 &&
                                        <NavLink to={department.id + "/jobs"} className={"text-decoration-none"}>
                                            <span className={classname}>{percent+"%"}</span>
                                        </NavLink>
                                    }
                                </td>
                                <td><button type='button' className='btn'><i className="fa fa-edit text-primary" onClick={()=>navigate(department.id+"/edit")}></i></button></td>
                                <td><button data-bs-toggle="modal" data-bs-target="#delete__department" type='button' className='btn' disabled={disabled} onClick={()=>setDepartmentId(department.id)}><i className={disabled?"fa fa-trash text-secondary":"fa fa-trash text-danger"}/></button></td>
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

