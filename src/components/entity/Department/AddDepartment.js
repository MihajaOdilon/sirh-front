import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';

export default function AddDepartment(){
  const navigate = useNavigate();
  const [name , setName] = useState("");
  const context = useContext(ContextUrl);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(context.url + 'departments' , {"name":name}).then(({data})=>console.log(data));
    navigate('..');
  }
    return (
      <>
          <form onSubmit={handleSubmit} className='department'>
              <input className='input-control w-100' required placeholder='Nom de département' onChange={(e)=>setName(e.target.value)} type={"text"}/>
              <div className='container-fluid text-end p-1'>
                  <button className="btn btn-danger" type='submit' name='add' id='add_update' onClick={()=>navigate("..")}>Annuler</button>
                  <button className="btn btn-primary" type='submit' name='add' id='cancel'>Confirmer</button>
              </div>
          </form>
      </>
    )
}
