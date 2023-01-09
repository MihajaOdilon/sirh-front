import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function Interviews() {
    const [interviews,setInterviews] = useState([]);
    const [questions,setQuestions] = useState([])
    const context = useContext(ContextUrl)
    const navigate = useNavigate()
    const {idjoboffer} = useParams()
    const [disabled,setDisabled] = useState(null)
    function classname(interview){
        if(interview.candidate.candidateResponses.length!==0 && !interview.candidate.isChoosen){
            return "card card__finished"
        }
        else if(interview.candidate.isChoosen){
            return "card card__choosen"
        }
        else{
            return "card"
        }
    }
    let totalMaxMark = 0
    questions.map(question=>
        totalMaxMark+=question.maxMark
    )
    useEffect(()=>{
        axios.get(context.url+"interviews",{params:{"offerId":idjoboffer}})
        .then(({data})=>setInterviews(data))
    },[context,idjoboffer])
    return (
        <>
            {/* <div className='container-fluid' >
                <div className='row'>
                    {
                         interviews.map(interview=>{
                            if(interview.candidate.candidateResponses.length===0){
                                return(
                                    <div className='col-md-3 card-container' key={interview.id}>
                                        <div className={classname(interview)} onClick={()=>navigate("../"+idjoboffer+"/candidates/"+interview.candidate.id+"/about")}>
                                            <div className='card-heading d-flex' style={{justifyContent:"space-between"}}>
                                                <span>{interview.candidate.person.name+" "+interview.candidate.person.firstname}</span>
                                            </div>
                                            <div className='card-body'>
                                                <ul className='navbar-nav'>
                                                    <li className='nav-item'>Date : {moment(interview.dateTime).format("DD-MM-YYYY")}</li>
                                                    <li className='nav-item'>Heure : {moment(interview.dateTime).format("HH:mm")}</li>
                                                </ul>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                            
                        })
                        
                    }
                    
                </div>
            </div> */}
            <div className='container-fluid list'>
                <table className='table'>
                    <thead>
                    <tr className=''>
                        <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                        <th scope='col'>Nom</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Heure</th>
                        <th scope='col'>Action</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                    {interviews.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                        interviews.map((interview,index)=>{
                            // if(interview.candidate.candidateResponses.length===0){
                                return(
                                    <tr key={interview.id}>
                                        <th scope='row'><input type={"checkbox"} value={interview.id} className='form-check-input'></input></th>
                                        <td>
                                            {interview.candidate.person.name+" "+interview.candidate.person.firstname}
                                        </td>
                                        <td>{moment(interview.dateTime).format("DD-MM-YYYY")}</td>
                                        <td>{moment(interview.dateTime).format("HH:mm")}</td>
                                        <td>
                                            {
                                                interview.candidate.candidateResponses.length===0 ?
                                                <button type='button' className='btn' onClick={()=>navigate(interview.candidate.id + "/about")}><i className="fas fa-book-reader text-primary"></i></button>
                                                :
                                                <button type='button' className='btn'><i className="fas fa-check text-success"></i></button>
                                            }
                                        </td>
                                    </tr>
                                )
                        })
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}
