import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { MenuBarConfirm } from '../../MenuBar'

export default function EditUser() {
    const {iduser}  = useParams();
    const context = useContext(ContextUrl);
    const [password,setPassword] = useState("");
    const handleSubmitEdit = async(e)=>{
        e.preventDefault();
        await axios.put(context.url + 'users/' + iduser ,null, {params:{"password":password}}).then(({data})=>console.log(data));//error 403 forbidden
    }
    return (
        <>
            <form onSubmit={handleSubmitEdit} className='form'>
                <input className='input-control w-100' required placeholder="Mot de passe" value={password} onChange={(e)=>setPassword(e.target.value)} type={"password"}/>
                <MenuBarConfirm/>
            </form>
        </>
    )
}
