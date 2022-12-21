import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar'

export default function EditDepartment() {
    const {iddepartment}  = useParams();
    const context = useContext(ContextUrl);
    const [name,setName] = useState("");
    const [loading,setLoading] = useState(null);
    const [isValid,setValid] = useState(null);
    const [msg,setMsg] = useState("");
    useEffect(()=>{
        axios.get(context.url + 'departments/' + iddepartment).then(({data})=>{
            setName(data.name)
        }).catch((err)=>console.log(err));
    },[context,iddepartment]);
    const handleSubmitEdit = async(e)=>{
        e.preventDefault();
        if(name){
            await axios.put(context.url + 'departments/' + iddepartment ,null, {params:{
                "name":name
            }})
            .then(({data})=>setMsg(data))
            .then(()=>setLoading(true));
            setTimeout(()=>{
                setLoading(false);
            },1500)
        }
        else{
            setValid(true)
            setTimeout(()=>{
                setValid(false)
            },1500)
        }
    }
    return (
        <>
            {loading && <div className='alert bg-info'>{msg}</div>}
            <form onSubmit={handleSubmitEdit} className='form'>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                {isValid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
                <MenuBarConfirm/>
            </form>
        </>
    )
}
