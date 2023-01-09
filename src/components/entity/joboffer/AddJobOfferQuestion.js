import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context'
import { INVALID_INPUT } from '../../../redux/constants/alertConstants'
import { MenuBarConfirm } from '../../MenuBar'
export default function AddJobOfferQuestion(){
    const {idjoboffer} = useParams()
    const [question , setQuestion] = useState("");
    const [maxMark , setMaxMark] = useState([]);
    const context = useContext(ContextUrl);
    const [loading,setLoading] = useState(null);
    const [msg,setMsg] = useState();
    const navigate = useNavigate()
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        if(question && maxMark){
            await axios.post(context.url + 'questions' ,null, {params:{
                "jobOfferId":idjoboffer,
                "question":question,
                "maxMark":maxMark
            }})
            .then(()=>{
                setMsg("Question crée avec succès");
                // setQuestion("")
                // setMaxMark()
                navigate("..")
                setTimeout(() => {
                    setMsg("");
                }, 3000);
            })
            .catch(err=>console.log(err))
        }
        else{
            setLoading(true);
            setTimeout(()=>{
                setLoading(false);
            },3000)
        }
    }

    return (
        <> 
            {msg && <div className='alert alert-success'>{msg}</div>}
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Note maximal</label>
                    <input type={"number"} value={maxMark} onChange={(e)=>setMaxMark(e.target.value)}/>
                </div>
                {loading && <div className='alert alert-warning'>{INVALID_INPUT}</div>}
                <MenuBarConfirm/>
            </form>
        </>
    )
}

