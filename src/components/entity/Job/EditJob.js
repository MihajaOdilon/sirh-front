import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar'

export default function EditJob() {
    const {idjob}  = useParams();
    const context = useContext(ContextUrl);
    const [name,setName] = useState("");
    const [isValid,setValid] = useState();
    const [msg,setMsg] = useState();

    useEffect(()=>{
        axios.get(context.url + 'jobs/' + idjob).then(({data})=>{ 
            setName(data.name);
        }).catch((err)=>console.log(err));
    },[context,idjob]);
    const handleSubmitEdit = async(e)=>{
        e.preventDefault()
        if(name){
            await axios.put(context.url + 'jobs/' + idjob ,null, {params:{
                "name":name
            }})
            .then(({data})=>{
                setMsg(data);
                setTimeout(() => {
                    setMsg("")
                }, 1500);
            });
        }
        else{
            setValid(true);
            setTimeout(() => {
                setValid(false)
            }, 1500);
        }

    }
    return (
    <>
        {msg && <div className='alert bg-info'>{msg}</div>}
        <form onSubmit={handleSubmitEdit} className='form'>
            <div className="form-group">
                <label>Nom</label>
                <input className='input-control' onChange={(e)=>setName(e.target.value)} type={"text"} value={name}/>
            </div>
            {isValid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
            <MenuBarConfirm/>
        </form>
    </>
    )
}
