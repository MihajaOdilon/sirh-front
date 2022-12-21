import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context'
export default function ListQuestions() {
    const {idjoboffer} = useParams()
    const context = useContext(ContextUrl)
    const navigate = useNavigate()
    const [questions,setQuestions] = useState([])
    const [jobOffer,setJobOffer] = useState([])
    useEffect(()=>{
        axios.get(context.url+"questions",{params:{"jobOfferId":idjoboffer}})
        .then(({data})=>setQuestions(data))
    },[context,idjoboffer])
    useEffect(()=>{
        axios.get(context.url+"joboffers/"+idjoboffer)
        .then(({data})=>setJobOffer(data))
    },[context,idjoboffer])
    return (
        <div>
            
            <div className='container-fluid card-container'>
                <div className='card'>
                    <div className='card-heading d-flex' style={{justifyContent:"space-between"}}>
                        <span>{jobOffer.title}</span>
                        <span>Note max</span>
                    </div>
                    <div className='card-body'>
                        {
                            questions.map((question,index)=>{
                            return(
                                <div className="d-flex" style={{justifyContent:"space-between"}} key={question.id}>
                                    <span>{question.description}</span>
                                    <span className='p-1'>{question.maxMark}</span>
                                </div>
                            )})
                        }
                    </div>
                </div>
            </div>
            <div className='container-fluid menubar'>
                <div className='btn-group' role={"group"}>
                    <button className="btn btn-success" type='button' onClick={()=>navigate("add")}><i className="fa fa-plus-circle"></i>Créer un question</button>
                </div>
            </div> 
        </div>
    )
}
