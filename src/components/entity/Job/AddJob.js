import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';

export default function AddJob() {
const context = useContext(ContextUrl)
const [name,setName] = useState("");
const [Departments,setDepartments] = useState([]);  
const [departmentId,setDepartmentId] = useState();
const [jobCategoryId,setjobCategoryId] = useState();
const [departmentName,setDepartmentName] = useState();
const [jobCategoryName,setjobCategoryName] = useState();
const [JobCategories,setJobCategories] = useState([]);
const [loading,setLoading] = useState();
const navigate = useNavigate()
useEffect(()=>{
    async function fetchDepartments(){
        await axios.get(context.url + "departments")
        .then(({data})=>setDepartments(data))
        .catch((err)=>console.log(err))
    }
    fetchDepartments()
},[context])
useEffect(()=>{
    if(Departments && Departments[0]){
        setDepartmentName((Departments[0].name))
        setDepartmentId((Departments[0].id))
    }
},[Departments])
useEffect(()=>{
    async function fetchJobCategories(){
        await axios.get(context.url + "jobcategories")
        .then(({data})=>setJobCategories(data))
        .catch((err)=>console.log(err))
    }
    fetchJobCategories()
},[context])
useEffect(()=>{
    if(JobCategories && JobCategories[0]){
        setjobCategoryId(JobCategories[0].id)
        setjobCategoryName(JobCategories[0].name)
    }
},[JobCategories])

const handleSubmit = async(e)=>{
    e.preventDefault()
    if(departmentId && jobCategoryId && name){
        await axios.post(context.url+'jobs',null,{params:{
            "name":name,
            "departmentId":departmentId,
            "categoryId":jobCategoryId
            }})
            .then(()=>{
                navigate("..")
            })
        } 
    else{
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
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
        <form onSubmit={handleSubmit} className='form'>
            <div className="form-group">
                <label>Nom</label>
                <input className='input-control' value={name} onChange={(e)=>setName(e.target.value)} type={"text"}/>
            </div>
            <div class="row">
                <div class="col-md">
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
                </div>
                <div class="col-md">
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
                </div>
            </div>


            {loading && <div className='alert alert-warning'>{INVALID_INPUT}</div>}  
            <MenuBarConfirm/>
        </form>
    </>
    )
}
