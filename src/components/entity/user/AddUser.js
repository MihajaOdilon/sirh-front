import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContextUrl from '../../../API/Context'
import { MenuBarConfirm } from '../../MenuBar'
export default function AddUser(){
  const [userName , setUserName] = useState("")
  const [password , setPassword] = useState("")
  const context = useContext(ContextUrl)
  const [errMsg,setErrMsg] = useState("")
  const [successMsg,setSuccessMsg] = useState("");
  const navigate = useNavigate()
  const handleSubmitAdd = async (e) => {
      e.preventDefault();
      await axios.post(context.url + 'users' , {"username":userName,"password":password})
      .then(()=>{
          setSuccessMsg("Utilisateur creé avec succès")
        //   setUserName("")
        //   setPassword("")
            navigate("..")
          setTimeout(() => {
              setSuccessMsg([])
          }, 1500)
      }).catch((err)=>{
          setErrMsg(err.response.data);
          setTimeout(() => {
              setErrMsg([]);
          }, 1500);
      })
  }
    return (
      <>
          {successMsg && <div className='alert bg-success'>{successMsg}</div>}
          <form onSubmit={handleSubmitAdd} className='form'>
              <input className='input-control' required placeholder="Nom d' utilisateur" value={null} onChange={(e)=>setUserName(e.target.value)} type={"text"}/>
              <input className='input-control' required placeholder='Mot de passe' onChange={(e)=>setPassword(e.target.value)} type={"password"}/>
              {errMsg && <div className='alert bg-warning'>{errMsg}</div>}
              <MenuBarConfirm/>
          </form>
      </>
    )
}