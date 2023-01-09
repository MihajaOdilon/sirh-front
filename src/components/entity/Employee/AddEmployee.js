import axios from 'axios'
import moment from 'moment'
import { number } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context'
import { INVALID_INPUT } from '../../../redux/constants/alertConstants'
import { MenuBarConfirm } from '../../MenuBar'

export default function AddEmployee() {
    const [cnaps,setCnaps] = useState("")
    const [ostie,setOstie] = useState("")
    const [hiringDate,setHiringDate] = useState()
    const [jobId,setJobId] = useState("")
    const [jobName,setJobName] = useState("")
    const [baseSalary,setbaseSalary] = useState("")
    const [contractCategoryId,setContractCategoryId] = useState("")
    const [startDate,setStartDate] = useState()
    const [endDate,setEndDate] = useState()
    const [assignement,setAssignement] = useState("")
    const {idperson} = useParams()
    const [EmployementContractCategories,setEmployementContractCategories] = useState([])
    const [Jobs,setJobs] = useState([])
    const [invalid,setInvalid] = useState(null)
    const [error,setError] = useState("")
    const context = useContext(ContextUrl)
    const navigate  = useNavigate()
    console.log(contractCategoryId)
    useEffect(()=>{
        axios.get(context.url+"contract-categories")
        .then(({data})=>{
            setEmployementContractCategories(data)
        })
    },[context])
    useEffect(()=>{
        if(contractCategoryId==="1"){
            setEndDate()
        }
    },[contractCategoryId])
    useEffect(()=>{
        axios.get(context.url + "jobs")
        .then(({data})=>setJobs(data))
    },[context])
    const handleSubmitAdd = (e) =>{
        e.preventDefault()
        if(idperson && cnaps && ostie && hiringDate && baseSalary && contractCategoryId && startDate && assignement){
            axios.post(context.url+"employees",null,{params:{
                "personId" : idperson,
                "cnaps" : cnaps,
                "ostie" : ostie,
                "hiringDate" : moment(hiringDate).format("YYYY-MM-DD"),
                "jobId" : jobId,
                "baseSalary" : baseSalary,
                "contractCategoryId" : contractCategoryId,
                "startDate" : moment(startDate).format("YYYY-MM-DD"),
                "endDate" : endDate? moment(endDate).format("YYYY-MM-DD"):null,
                "assignment":assignement
            }})
            .then(()=>navigate(".."))
            .catch(err=>{
                setError(err.response.data)
            })
        }
        else{
            setInvalid(true)
            setTimeout(() => {
                setInvalid(false)
            }, 3000);
        }
    }
    const handleSelectJob = (e) =>{
        setJobId(e.target.value);
        setJobName(e.target.name);
    }
        return (
        <div>
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="row">
                    <div className="col-md">
                        <div className="form-group">
                            <label ><abbr>Cnaps</abbr></label>
                            <input type="number"value={cnaps} className="form-control" onChange={(e)=>setCnaps(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                            <label ><abbr>Ostie</abbr></label>
                            <input type="number" value={ostie} className="form-control" onChange={(e)=>setOstie(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <div className="dropdown">
                            <label >Employes</label>
                            <button type="button" className="btn select" data-bs-toggle="dropdown">
                                <span>{jobName}</span>
                            </button>
                            <div className="dropdown-menu">
                                <div className='container-fluid item'>
                                    {Jobs.map((job)=>{
                                        return <button type='button' key={job.id} value={job.id} name={job.name} className="dropdown-item" onClick={(e)=>handleSelectJob(e)}>{job.name}</button>
                                    })} 
                                </div>
                            </div>                  
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group">
                            <label >Salaire de base</label>
                            <input type="number" value={baseSalary} className="form-control" onChange={(e)=>setbaseSalary(e.target.value)}/>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-group" style={{paddingTop:"5px"}}>
                            <label>Date d' embauche</label>
                            <DateTimePicker
                                className={"datetime__picker"}
                                value={hiringDate}
                                onChange={(date)=>setHiringDate(date)}
                                disableClock
                            />
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label>Contrat de travail</label>
                        <ul className='nav '>
                            {   
                                EmployementContractCategories.map(EmployementContractCategory=>{
                                    return(
                                        <li className="nav-item pt-2 pe-5 pb-2 ps-0" key={EmployementContractCategory.id}>
                                            <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="optRadio" value={contractCategoryId} onChange={()=>setContractCategoryId(EmployementContractCategory.id)}/>
                                            {EmployementContractCategory.name}
                                            </label>
                                        </li>                       
                                    )
                                })
                            }
                        </ul>
                        {
                            contractCategoryId &&
                            <div className='row'>
                                <div className='col-md'>
                                    <div className="form-group">
                                        <label>Debut de contrat</label>
                                        <DateTimePicker
                                            className={"datetime__picker"}
                                            value={startDate}
                                            onChange={(date)=>setStartDate(date)}
                                        />
                                    </div>
                                </div>

                                {
                                    contractCategoryId !==1 &&
                                    <div className="col-md">
                                        <div className="form-group">
                                            <label>Fin de contrat</label>
                                            <DateTimePicker
                                                className={"datetime__picker"}
                                                value={endDate}
                                                onChange={(date)=>setEndDate(date)}
                                            />
                                        </div>
                                    </div>

                                }
                            </div>                      
                        }
                    
                </div>
                <div className="form-group">
                    <label >Mission</label>
                    <textarea type="text" value={assignement} className="form-control" onChange={(e)=>setAssignement(e.target.value)}/>
                </div>
                {invalid && <div className='alert alert-warning'>{INVALID_INPUT}</div>}
                {error && <div className='alert alert-warning'>{error}</div>}
                <div className='container-fluid menubar p-0'>
                    <div className='btn-group' role={"group"} aria-label="">
                        <button className="btn btn-warning text-light" type='button' onClick={()=>navigate("..")}><i className="fa fa-times"></i> Annuler</button>
                        <button className="btn btn-success" type='submit'><i className="fa fa-check"></i> Confirmer</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
