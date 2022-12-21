import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar'

export default function EditJobCategory() {
    const {idjobcategory}  = useParams();
    const context = useContext(ContextUrl);
    const [name,setName] = useState("");
    const [minSalary,setMinSalary] = useState("");
    const [maxSalary,setMaxSalary] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const [isValid,setValid] = useState(null);
    const [successMsg,setSuccessMsg] = useState("");
    useEffect(()=>{
        axios.get(context.url + 'jobcategories/' + idjobcategory).then(({data})=>{
            setName(data.name);
            setMinSalary(data.minSalary);
            setMaxSalary(data.maxSalary)
        }).catch((err)=>console.log(err));
    },[context,idjobcategory]);
    const handleSubmitEdit = async(e)=>{
        e.preventDefault();
        if(name && minSalary &&maxSalary){
            await axios.put(context.url + 'jobcategories/' + idjobcategory ,null, {params:{
                "name":name,
                "minSalary":minSalary,
                "maxSalary":maxSalary
            }})
            .then(({data})=>{
                setSuccessMsg(data);
                setTimeout(() => {
                    setSuccessMsg("")
                }, 1500);
            })
            .catch((err)=>{
                setErrorMsg(err.response.data);
                setTimeout(() => {
                    setErrorMsg("")
                }, 1500);
            });
        }//tsy ampy condition max>min
        else{
            setValid(true);
            setTimeout(() => {
                setValid(false)
            }, 1500);
        }
    }
    return (
        <>
            {successMsg && <div className='alert bg-success'>{successMsg}</div>}
            <form onSubmit={handleSubmitEdit} className='form'>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" value={name} className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Salaire minimale</label>
                    <input type="number" value={minSalary} className="form-control" onChange={(e)=>setMinSalary(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Salaire maximale</label>
                    <input type="number" value={maxSalary} className="form-control" onChange={(e)=>setMaxSalary(e.target.value)}/>
                </div>
                {isValid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
                {errorMsg && <div className='alert bg-warning'>{errorMsg}</div>}
                <MenuBarConfirm/>
            </form>
        </>
    )
}
