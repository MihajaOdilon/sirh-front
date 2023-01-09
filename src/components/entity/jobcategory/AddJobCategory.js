import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';

export default function AddJobCategory() {
    const [name,setName] = useState("");
    const [minSalary,setMinSalary] = useState("");
    const [maxSalary,setMaxSalary] = useState("");
    const context = useContext(ContextUrl);
    const [isValid,setValid] = useState(null);
    const [errorMsg,setErrorMsg] = useState("")
    const [successMsg,setSuccessMsg] = useState("")
    const navigate = useNavigate() 
    const handleSubmitAdd = async(e)=>{
        e.preventDefault();
        if(name && minSalary && maxSalary){
            await axios.post(context.url + 'jobcategories', {'name':name , 'minSalary':minSalary , 'maxSalary':maxSalary})
            .then(({data})=>{
                setSuccessMsg(data);
                // setName("");
                // setMinSalary("");
                // setMaxSalary("");
                navigate("..")
                setTimeout(() => {
                    setSuccessMsg("");
                }, 3000);
            })
            .catch((err)=>{
                setErrorMsg(err.response.data);
                setTimeout(() => {
                    setErrorMsg("")
                }, 3000);
            });
        }
        else{
            setValid(true);
            setTimeout(()=>{
                setValid(false)
            },3000)
        }

    }
    return (
        <>
            {successMsg && <div className='alert alert-success'>{successMsg}</div>}
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" value={name} className="form-control" onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div class="row">
                    <div class="col-md">
                        <div className="form-group">
                            <label>Salaire minimale</label>
                            <input type="number" value={minSalary} className="form-control" onChange={(e)=>setMinSalary(e.target.value)}/>
                        </div>
                    </div>
                    <div class="col-md">                      
                        <div className="form-group">
                            <label>Salaire maximale</label>
                            <input type="number" value={maxSalary} className="form-control" onChange={(e)=>setMaxSalary(e.target.value)}/>
                        </div>
                    </div>
                </div>

                {isValid && <div className='alert alert-warning'>{INVALID_INPUT}</div>}
                {errorMsg && <div className='alert alert-warning'>{errorMsg}</div>}
                <MenuBarConfirm/>
            </form>
        </>
  )
}
