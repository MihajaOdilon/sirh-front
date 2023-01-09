import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import { markAsDone } from '../../../API/MarkOrDeleteSelected';

export default function ListJobOffers() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate()
    const [jobOfferId, setJobOfferId] = useState("");
    const [loading,setLoading] = useState(null);
    const [jobOffers,setJoboffers] = useState([]);
    const [interviews,setInterviews] = useState(new Map());
    useEffect(()=>{
        async function fetchJobOffers(){
            await axios.get(context.url + 'joboffers/available').then(({data})=>setJoboffers(data)).catch((err)=>console.log(err));
        }
        fetchJobOffers()
    },[loading,context])
    // useEffect(()=>{
    //     if(jobOffers){
    //         let interviewsTemp = interviews
    //         jobOffers.map(joboffer=>{
    //             axios.get(context.url + "interviews")
    //         })
    //         setInterviews(interviewsTemp)
    //     }
    // },[context,jobOffers,interviews])
    const handleMarkAsDone = () => {
        axios.put(context.url+"joboffers/mark-as-done",null,{params:{
            "offerId":jobOfferId
        }})
        .then(({data})=>{
            setLoading(data)
            setTimeout(() => {
                setLoading("")
            }, 3000);
        })
    }
    if(interviews){
        for(let[key,value] of interviews){
            console.log(key + " " + value)
        }
    }

    return (
        <>
            <div className="modal fade" id='mark__as__down' tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-danger">Attention!</h5>
                    </div>
                    <div className="modal-body">
                      <p>Voulez-vous marquer cet offre comme terminée ?</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" className="btn btn-danger" onClick={handleMarkAsDone} data-bs-dismiss="modal">Marquer comme terminé</button>
                    </div>
                  </div>
                </div>
            </div>
            <div className='container-fluid'>
                {
                    loading &&
                    <div className='alert alert-success'>{loading}</div>   
                }
                <div className='row'>
                    {
                        jobOffers.map(joboffer=>{
                            let interviewNumbers = 0
                            let MarkNumbers = 0
                            let ChoosedNumbers = 0
                            return(
                                <div className='col-md-4 card-container' key={joboffer.id}>
                                    <div className='card'>
                                        <div className='card-heading'>
                                                <span>{joboffer.title}</span>
                                                <button className='btn p-0' data-bs-toggle="modal" data-bs-target="#mark__as__down" onClick={(e)=>setJobOfferId(joboffer.id)}><i className="fa fa-times text-danger fs-5" aria-hidden="true"></i></button>
                                        </div>
                                        <div className='card-body job__offer'>
                                            <ul className='navbar-nav'>
                                                <li className='nav-item'>Description : {joboffer.description}</li> 
                                                <li className='nav-item'>Description : {joboffer.jobId}</li> 
                                            </ul>
                                        </div>
                                        <div className='card-footer'>
                                            <div className='container-fluid p-0 text-end'>
                                                <button type='button' className='bg-primary text-light p-1' onClick={()=>navigate(joboffer.id+"/managers")}>
                                                    Gérer cette offre   
                                                    <i className="fas fa-angle-double-right "></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                      })
                    }
                </div>
            </div>
            <div className='container-fluid menubar'>
                <div className='btn-group' role={"group"}>
                    <button className="btn btn-success" type='button' onClick={()=>navigate("add")}><i className="fa fa-plus-circle"></i>Créer un offre d'emploi</button>
                </div>
            </div>
        </>
    )
}

