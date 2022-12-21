import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function ListInterviews() {
    const [interview,setInterview] = useState([]);
    const [interviewId,setInterviewId] = useState();
    const [questions,setQuestions] = useState([])
    const context = useContext(ContextUrl)
    const navigate = useNavigate()
    const {idjoboffer,idcandidate} = useParams()
    const [notes,setNotes] = useState()
    let totalMaxMark = 0
    questions.map(question=>
        totalMaxMark+=question.maxMark
    )
    useEffect(()=>{
        let note = 0
        axios.get(context.url+"interviews",{params:{"candidateId":idcandidate}})
        .then(({data})=>{
            setInterview(data)
        })
        .then(()=>{
            // console.log(interview[0])
            // interview[0].candidate && interview[0].candidate.candidateResponses.map(response=>note+=response.mark)
            setNotes(note)
        })
    },[context,idcandidate])
    useEffect(()=>{
        axios.get(context.url+"questions",{params:{"jobOfferId":idjoboffer}})
        .then(({data})=>setQuestions(data))
    },[context,idjoboffer])
    return(
                <>
                    {
                        interview[0] && interview[0].candidate &&
                        <div className='col-md-12 card-container' key={interview[0].id}>
                            <div className='card'>
                                <div className='card-heading d-flex' style={{justifyContent:"space-between"}}>
                                    <span>{interview[0].candidate.person.name+" "+interview[0].candidate.person.firstname}</span>
                                        {
                                            interview[0].candidate.candidateResponses.length===0 &&
                                            <button type='button' onClick={()=>navigate("addresponse")} className='btn btn-info text-white p-0 ps-1 pe-1'>
                                                Passer à l'examen
                                            </button>                                                                                       
                                        }
                                </div>
                                <div className='card-body'>
                                    <ul className='navbar-nav'>
                                        <li className='nav-item'>Date : {interview[0].dateTime}</li>
                                    </ul>
                                    {
                                        interview[0].candidate.candidateResponses.length!==0 &&
                                        <span>Note : {notes+"/"+ totalMaxMark}</span> 
                                    }
                                    {
                                        interview[0].remark!==null &&
                                        <span>Remarque : {interview[0].remark}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    
                </>
    )
}
