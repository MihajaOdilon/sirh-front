import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import FetchAll from '../../../API/GetAll';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';

export default function AddJob() {
const context = useContext(ContextUrl)
const [name,setName] = useState([]);
const [departmentId,setDepartmentId] = useState();
const [jobCategoryId,setjobCategoryId] = useState();
const [departmentName,setDepartmentName] = useState();
const [jobCategoryName,setjobCategoryName] = useState();
const [Departments] = FetchAll(context.url+'departments');
const [JobCategories] = FetchAll(context.url+'jobcategories');
const [loading,setLoading] = useState(null);
const [msg,setMsg] = useState("")
const navigate = useNavigate()
const handleSubmit = async(e)=>{
    e.preventDefault()
    if(departmentId && jobCategoryId && name){
        await axios.post(context.url+'jobs',null,{params:{
            "name":name,
            "departmentId":departmentId,
            "categoryId":jobCategoryId}})
            .then(({data})=>{
                setMsg(data);
                // setName("")
                // setDepartmentId("");
                // setDepartmentName("");
                // setjobCategoryId("");
                // setjobCategoryName("");
                navigate("..")
                setTimeout(() => {
                    setMsg("");
                }, 1500);
            })
        } 
    else{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },1000)
    }
}
const handleSelectDepartment = (e) =>{
    setDepartmentId(e.target.value);
    setDepartmentName(e.target.name);
}
const handleSelectJobCategory = (e) =>{
    setjobCategoryId(e.target.value);
    setjobCategoryName(e.target.name)
}
return (
    <>
        {msg && <div className='alert bg-success'>{msg}</div>}
        <form onSubmit={handleSubmit} className='form'>
            <div className="form-group">
                <label>Nom</label>
                <input className='input-control' value={name} onChange={(e)=>setName(e.target.value)} type={"text"}/>
            </div>
            <div className="dropdown">
                <label >Département</label>
                <button type="button" className="btn select" data-bs-toggle="dropdown">
                    <span>{departmentName}</span>
                </button>
                <div className="dropdown-menu">
                    <div className='container-fluid item'>
                        {Departments.map((departement)=>{
                            return <button type='button' key={departement.id} value={departement.id} name={departement.name} className="dropdown-item" onClick={(e)=>handleSelectDepartment(e)}>{departement.name}</button>
                        })} 
                    </div>
                </div>
            </div>
            <div className="dropdown">
                <label >Catégorie</label>
                <button type="button" className="btn select" data-bs-toggle="dropdown">
                    <span>{jobCategoryName}</span>
                </button>
                <div className="dropdown-menu">
                    <div className='container-fluid item'>
                        {JobCategories.map((jobcategory)=>{
                            return <button type='button' key={jobcategory.id} value={jobcategory.id} name={jobcategory.name} className="dropdown-item" onClick={(e)=>handleSelectJobCategory(e)}>{jobcategory.name}</button>
                        })} 
                    </div>
                </div>
            </div>
            {loading && <div className='alert bg-warning'>{INVALID_INPUT}</div>}  
            <MenuBarConfirm/>
        </form>
    </>
    )
}
