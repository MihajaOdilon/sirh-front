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
    const [hiringDate,setHiringDate] = useState(new Date())
    const [jobId,setJobId] = useState("")
    const [jobName,setJobName] = useState("")
    const [baseSalary,setbaseSalary] = useState("")
    const [contractCategoryId,setContractCategoryId] = useState("")
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [assignement,setAssignement] = useState("")
    const {idperson} = useParams()
    const [EmployementContractCategories,setEmployementContractCategories] = useState([])
    const [Jobs,setJobs] = useState([])
    const [invalid,setInvalid] = useState(null)
    const context = useContext(ContextUrl)
    const navigate  = useNavigate()
    useEffect(()=>{
        axios.get(context.url+"contract-categories")
        .then(({data})=>{
            setEmployementContractCategories(data)
        })
    },[context])
    useEffect(()=>{
        if(contractCategoryId==="2"){
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
                "contractCategoryId" : 1,
                "startDate" : moment(startDate).format("YYYY-MM-DD"),
                "endDate" : null,
                "assignment":assignement
            }})
            .then(()=>navigate(".."))
        }
        else{
            setInvalid(true)
            setTimeout(() => {
                setInvalid(false)
            }, 1500);
        }
    }
    const handleSelectJob = (e) =>{
        setJobId(e.target.value);
        setJobName(e.target.name);
    }
        return (
        <div>
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="form-group">
                    <label ><abbr>C N A P S</abbr></label>
                    <input type="text"value={cnaps} className="form-control" onChange={(e)=>setCnaps(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label ><abbr>O S T I E</abbr></label>
                    <input type="text" value={ostie} className="form-control" onChange={(e)=>setOstie(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label >Salaire de base</label>
                    <input type="number" value={baseSalary} className="form-control" onChange={(e)=>setbaseSalary(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Date d' embauche</label>
                    <DateTimePicker
                        className={"datetime__picker"}
                        value={hiringDate}
                        onChange={(date)=>setHiringDate(date)}
                        disableClock
                    />
                </div>
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
                <div className='form-group'>
                    <label>Contrat de travail</label>
                    <div className='container__contract__category'>
                        <div className='container-fluid contract__category'>
                            {   
                                EmployementContractCategories.map(EmployementContractCategory=>{
                                    return(
                                        <div className="form-check-inline" key={EmployementContractCategory.id}>
                                            <label className="form-check-label">
                                            <input type="radio" className="form-check-input" name="optRadio" value={EmployementContractCategory.id} onChange={(e)=>setContractCategoryId(e.target.value)}/>
                                            {EmployementContractCategory.name}
                                            </label>
                                        </div>                       
                                    )
                                })
                            }
                        </div>
                        {
                            contractCategoryId &&
                            <>
                                <div className="form-group">
                                    <label>Debut de contrat</label>
                                    <DateTimePicker
                                        className={"datetime__picker"}
                                        value={startDate}
                                        onChange={(date)=>setStartDate(date)}
                                    />
                                </div>
                                {
                                    contractCategoryId !=="2" &&
                                    <div className="form-group">
                                        <label>Fin de contrat</label>
                                        <DateTimePicker
                                            className={"datetime__picker"}
                                            value={endDate}
                                            onChange={(date)=>setEndDate(date)}
                                        />
                                    </div>
                                }
                            </>                      
                        }
                    </div>
                    
                </div>
                <div className="form-group">
                    <label >Mission</label>
                    <textarea type="text" value={assignement} className="form-control" onChange={(e)=>setAssignement(e.target.value)}/>
                </div>
                {invalid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
                {/* {errorMsg && <div className='alert bg-warning'>{errorMsg}</div>} */}
                <div className='container-fluid menubar p-0'>
                    <div className='btn-group' role={"group"} aria-label="">
                        <button className="btn btn-warning text-light" type='button' onClick={()=>navigate("../../joboffers")}><i className="fa fa-times"></i> Annuler</button>
                        <button className="btn btn-success" type='submit'><i className="fa fa-check"></i> Confirmer</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
