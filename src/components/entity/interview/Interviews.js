import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function Interviews() {
    const [interviews,setInterviews] = useState([]);
    const [questions,setQuestions] = useState([])
    const [Idquestions,setIdQuestions] = useState(new Map())
    const context = useContext(ContextUrl)
    const {idjoboffer} = useParams()
    const [disabled,setDisabled] = useState(null)
    const [notes,setNotes] = useState()
    let totalMaxMark = 0
    questions.map(question=>
        totalMaxMark+=question.maxMark
    )
    const updateIdquestions = (e) => {
        let IdquestionsTemp = Idquestions;
        if(e.target.value!==""){
            IdquestionsTemp.set(e.currentTarget.id,e.target.value);
        }
        else{
            IdquestionsTemp.delete(e.currentTarget.id)
        }
        setIdQuestions(IdquestionsTemp);
        setDisabled(IdquestionsTemp.size!==questions.length?true:false)
    }
        useEffect(()=>{

        })
    useEffect(()=>{
        axios.get(context.url+"interviews",{params:{"offerId":idjoboffer}})
        .then(({data})=>setInterviews(data))
    },[context,idjoboffer,disabled])
    useEffect(()=>{
        axios.get(context.url+"questions",{params:{"jobOfferId":idjoboffer}})
        .then(({data})=>setQuestions(data))
    },[context,idjoboffer])
    return (
        <>
            <div className='container-fluid' >
                <div className='row'>
                    {
                        interviews.map(interview=>{
                            let note = 0
                            interview.candidate.candidateResponses.map(response=>note += response.mark)
                            // setNotes(note)
                            return(
                                <div className='col-md-3 card-container' key={interview.id}>
                                    <div className='card interview'>
                                        <div className='card-heading d-flex' style={{justifyContent:"space-between"}}>
                                            <span>{interview.candidate.person.name+" "+interview.candidate.person.firstname}</span>
                                        </div>
                                        <div className='card-body'>
                                            <ul className='navbar-nav'>
                                                <li className='nav-item'>Date : {interview.dateTime}</li>
                                                <li className='nav-item'>Note : {note+"/"+ totalMaxMark}</li>  
                                                {
                                                    interview.remark &&
                                                    <li className='nav-item'>Remarque : {interview.remark}</li>
                                                }
                                            </ul>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                    
                </div>
            </div>
        </>
    )
}
