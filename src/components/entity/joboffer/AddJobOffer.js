import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import FetchAll from '../../../API/GetAll';
import { MenuBarConfirm } from '../../MenuBar';
export default function AddJobOffer(){
    const context = useContext(ContextUrl);   
    const navigate = useNavigate();
    const [title , setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [jobId , setJobId] = useState("");
    const [jobName,setJobName] = useState(""); 
    const [jobs] = FetchAll(context.url + "jobs");
    const [loading,setLoading] = useState(null);
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        if(title && description && jobId){
            await axios.post(context.url + 'joboffers' ,null, {params:{
                "title":title,
                "description":description,
                "jobId":jobId}})
            .then(()=>navigate('..'))
            .catch((err)=>console.log(err));
        }
        else{
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }
    const handleSelectJob = (e) =>{
        setJobId(e.target.value);
        setJobName(e.target.name);
    }

    return (
        <>
            {/* <div className='container-fluid title'>Ajouter une offre d'emploi</div> */}
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className="dropdown">
                    <label>Emploi</label>
                    <button type="button" className="btn select" value={jobId} data-bs-toggle="dropdown">
                        <span>{jobName}</span>
                    </button>
                    <div className="dropdown-menu">
                        <div className='container-fluid item'>
                            {jobs.map((job)=>{
                                return <button type='button' key={job.id} value={job.id} name={job.name} className="dropdown-item" onClick={(e)=>handleSelectJob(e)}>{job.name}</button>
                            })}
                        </div>
                    </div>
                </div>
                {loading && <div className='alert alert-warning'>Veuillez renseigner touts les champs</div>}
                <MenuBarConfirm/>
            </form>
      </>
    )
}
