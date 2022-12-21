import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context'
import { MenuBarConfirm } from '../../MenuBar'

export default function VacationStories() {
    const [vacations,setVacations] = useState([])
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [reason,setReason] = useState()
    const [success,setSuccess] = useState("")
    const [error,setError] = useState("")
    const {idemployee} = useParams()
    const context = useContext(ContextUrl)
    console.log(idemployee)
    useEffect(()=>{
        axios.get(context.url+"vacations",{params:{"employeeId":idemployee}})
        .then(({data})=>{
            setVacations(data)
        })
    },[context,idemployee,success])
    const addVacation = () =>{
        if(startDate && endDate && idemployee && reason){
            axios.post(context.url+"vacations",null,{params:{
                "employeeId":idemployee,
                "startDate": moment(startDate).format("YYYY-MM-DD"),
                "endDate": moment(endDate).format("YYYY-MM-DD"),
                "reason" : reason
            }})
            .then(()=>{
                setSuccess("Congé crée avec succès")
                setTimeout(() => {
                    setSuccess()
                }, 1500);
            })
            .catch((err)=>{
                setError(err.response.data)
                setTimeout(() => {
                    setError()
                }, 1500);
            })
        }
        else{
            console.log("vide")
        }

    }
    return (
        <>
            <div className="modal fade" id='add__vacation' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Création du congé!</h5>
                    </div>
                    <div className="modal-body">
                        <form className='form'>
                            <div className="form-group">
                                <label>Debut</label>
                                <DateTimePicker
                                    className={"datetime__picker"}
                                    value={startDate}
                                    onChange={(date)=>setStartDate(date)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Debut</label>
                                <DateTimePicker
                                    className={"datetime__picker"}
                                    value={endDate}
                                    onChange={(date)=>setEndDate(date)}
                                />
                            </div>
                            <div className="form-group">
                                <label >Raison</label>
                                <textarea type="text" value={reason} className="form-control" onChange={(e)=>setReason(e.target.value)}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={ addVacation } data-bs-dismiss="modal">Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                {
                    success &&
                    <div className='alert bg-success'>{success}</div>
                }
                {
                    error &&
                    <div className='alert bg-success'>{error}</div>
                }
                    {
                        vacations.map(vacation=>{
                            return(
                                <div className='col-md-3 card-container'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <p>Date : {moment(vacation.startDate).format("YYYY/MM/DD") + " - " + moment(vacation.endDate).format("YYYY/MM/DD")}</p>
                                            <p>Jours restants : {vacation.rest}</p>
                                            <p>Raison : {vacation.reason}</p>    
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container-fluid menubar p-0'>
                    <div className='btn-group' role={"group"} aria-label="">
                        <button className="btn btn-success" type='button' data-bs-toggle="modal" data-bs-target="#add__vacation"><i className="fa fa-plus"></i>Donner un congé</button>
                    </div>
                </div>
            </div>
        </>
        
    )
}
