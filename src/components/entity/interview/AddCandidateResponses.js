import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function AddCandidateResponses() {
    const [interview,setInterview] = useState([]);
    const [candidateId,setCandidateId] = useState();
    const [questions,setQuestions] = useState([])
    const [bonus,setBonus] = useState()
    const [bonusReason,setBonusReason] = useState()
    const [Idquestions,setIdQuestions] = useState(new Map())
    const [checked,setChecked] = useState()
    const context = useContext(ContextUrl)
    const navigate = useNavigate()
    const {idjoboffer,idcandidate} = useParams()
    console.log(idcandidate)
    const [remark,setRemark] = useState("")
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
        axios.get(context.url+"questions",{params:{"jobOfferId":idjoboffer}})
        .then(({data})=>setQuestions(data))
    },[context,idjoboffer])
    useEffect(()=>{
        axios.get(context.url+"interviews",{params:{
            "candidateId":idcandidate
        }})
        .then(({data})=>setInterview(data[0]))
    },[context,idjoboffer,idcandidate])
        const handleCreateCandidateResponse = async(e) =>{
            e.preventDefault()
            for(var[key,value] of Idquestions){
                await axios.post(context.url+"responses",null,{params:{
                    "candidateId":idcandidate,
                    "questionId":key,
                    "mark":value
                }})
                .then(()=>navigate(".."))
            }
            if(remark){
                axios.put(context.url+"interviews",null,{params:{
                    "remark":remark,
                    "interviewId":interview.id
                }})
            }
            if(bonus && bonusReason){
                axios.post(context.url+"bonuses",null,{params:{
                    "interviewId":interview.id,
                    "bonusReason":bonusReason,
                    "point":bonus
                }})
            }
        }
    return (
                <>
                    <form className='form' onSubmit={handleCreateCandidateResponse}>
                        {
                            questions.map(question=>{
                                return(
                                    <div className="form-group" key={question.id}>
                                        <div className='d-flex' style={{justifyContent:'space-between'}}>
                                            <label>{question.description}</label>
                                            <label>{question.maxMark + "points"}</label>
                                        </div>
                                        <input type="number" max={question.maxMark} value={Idquestions[question.id]} onChange={updateIdquestions} id={question.id} className="form-control"/>
                                        {
                                            Idquestions[question.id]==="" &&
                                            <div className='alert alert-warning'>{INVALID_INPUT}</div>
                                        }
                                    </div>
                                )
                            })
                        }
                        <div className="container-fluid p-0">
                            <div className="form-check">
                              <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" onChange={(e)=>setChecked(e.target.checked)} value="checkedValue"/>
                                Plus
                              </label>
                            </div>
                            {
                                checked&&
                                <div className="form-group">
                                    <label>Bonus</label>
                                    <input type="number" className="form-control" value={bonus} onChange={(e)=>setBonus(e.target.value)}/>
                                    {
                                        bonus&&
                                        <div className="form-group">
                                            <label>Raison</label>
                                            <textarea className="form-control" value={bonusReason} onChange={(e)=>setBonusReason(e.target.value)}/>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label>Remarque</label>
                                        <textarea className="form-control" value={remark} onChange={(e)=>setRemark(e.target.value)}/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="container-fluid text-end p-0">
                            <div className='btn-group'>
                            <button type="button" className="btn btn-secondary" onClick={()=>navigate("..")}>Annuler</button>
                            <button type="submit" className="btn btn-primary" disabled={Idquestions.size!==questions.length}>Enregistrer</button>                                        
                            </div>
                        </div>
                    </form>
                </>
    )
}
