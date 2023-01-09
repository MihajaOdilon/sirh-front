import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';
export default function AddDepartment(){
  const [name , setName] = useState("");
  const [loading,setLoading] = useState(null);
  const context = useContext(ContextUrl);
  const [msg,setMsg] = useState("")
  const navigate = useNavigate()
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if(name){
        await axios.post(context.url + 'departments' , {
            "name":name
        })
        .then(({data})=>{
            setMsg(data);
            // setName("");
            navigate("..")
            setTimeout(() => {
                setMsg("");
            }, 3000);
        });
    }
    else{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false)
        },1000)
    }
    
  }

    return (
      <>
          {msg && <div className='alert alert-success'>{msg}</div>}
          <form onSubmit={handleSubmitAdd} className='form'>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              {loading && <div className='alert alert-warning'>{INVALID_INPUT}</div>}
              <MenuBarConfirm/>
          </form>
      </>
    )
}
