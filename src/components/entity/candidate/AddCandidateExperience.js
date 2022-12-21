import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';
export default function AddCandidateExperience(){
    const {idcandidate} = useParams();
    const [title , setTitle] = useState("");
    const [company,setCompany] = useState("");
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [isValid,setValid] = useState(null);
    const [candidate,setCandidate] = useState(null);
    const context = useContext(ContextUrl);
    const [msg,setMsg] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(context.url+"candidates/"+idcandidate)
        .then(({data})=>{            
            setCandidate(data) 
        })
    },[context,idcandidate])
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        if(idcandidate && title && company && startDate && endDate){
            await axios.post(context.url+"experiences",null,{params:{
                "personId":candidate.person.id,
                "title":title,
                "company":company,
                "startDate":moment(startDate).format("YYYY-MM-DD"),
                "endDate":moment(endDate).format("YYYY-MM-DD")
            }})
            .then(()=>{
                navigate("../"+candidate.id+"/about")
            })
        }
        else{
            setValid(true)
            setTimeout(() => {
                setValid(false)
            }, 1500);
        }

    }

    return (
    <>
        {msg && <div className='alert bg-success'>{msg}</div>}
        <form onSubmit={handleSubmitAdd} className='form'>
            <div className="form-group">
                <label>Titre</label>
                <input type="text" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Societé</label>
                <input type="text" className="form-control" value={company} onChange={(e)=>setCompany(e.target.value)}/>
            </div>
            <div className="form-group">
                    <label>Date de debut</label>
                    <ReactDatePicker
                    selected={startDate}
                    onChange={(date)=>setStartDate(date)}
                    showMonthYearPicker
                    dateFormat={"dd-MM-yyyy"}
                    />
                </div>
                <div className="form-group">
                    <label>Date fin</label>
                    <ReactDatePicker
                    selected={endDate}
                    onChange={(date)=>setEndDate(date)}
                    showMonthYearPicker
                    dateFormat={"dd-MM-yyyy"}
                    />
                </div>
            {isValid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}           
            <div className='container-fluid menubar p-0'>
                <div className='btn-group' role={"group"} aria-label="">
                    <button className="btn btn-warning text-light" type='button' onClick={()=>navigate("../"+candidate.id+"/about")}><i className="fa fa-times"></i> Annuler</button>
                    <button className="btn btn-success" type='submit'><i className="fa fa-check"></i> Confirmer</button>
                </div>
            </div>
        </form>
    </>
    )
}

