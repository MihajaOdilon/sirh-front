import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"

export default function ListUsers() {
  const context = useContext(ContextUrl);
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [editDisabled, setEditDisabled] = useState(true);
  const [users,setUsers] = useState([]);
  const [userId,setUserId] = useState([]);
  const [msg,setMsg] = useState([]);
  
  useEffect(()=>{
      async function fetchData(){
          await axios.get(context.url + 'users').then(({data})=>setUsers(data));
      }
      fetchData();
  },[msg,context])
  const confirmDelete = async () => {
      axios.delete(context.url+'users/'+userId)
      .then(({data})=>{
          setMsg(data)
          setTimeout(() => {
              setMsg([])
          }, 1500);
      })
  }
  useEffect(()=>{
      $(document).on('input',"#search", async function(e){
          const val = e.target.value
          if(val!==''){
              await axios.get(context.url+"users/search", {params:{"username":val}})
              .then(({data})=>setUsers(data));
          }
          else{
              await axios.get(context.url + 'users').then(({data})=>setUsers(data));
          }
      });
      return ()=>{
        $(document).off("input","#search");
      }
  },[context])

  const updateIds = (e) => {
    let idsTemp = ids;
    
    if(e.target.checked){
      idsTemp.push(e.target.value);
    }else{
      let pos = idsTemp.indexOf(e.target.value);
      if(pos >= 0 && pos < idsTemp.length){
        idsTemp.splice(pos, 1);
      }
    }
    setIds(idsTemp);
    setDeleteDisabled(ids.length === 0);
    setEditDisabled(ids.length !== 1);
  }

  
  return (
    <>
      <div className="modal fade" id='deleteModal' tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Suppression</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Voulez-vous supprimer vraiment la sélection ?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" className="btn btn-primary" onClick={ confirmDelete } data-bs-dismiss="modal">Supprimer</button>
              </div>
            </div>
          </div>
      </div>
      <div className='container-fluid list'>
      {msg && <div className='alert bg-danger'>{msg}</div>}
      <table className='table'>
          <thead>
              <tr className=''>
                  <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                  <th scope='col'>Nom</th>
                  <th scope='col' colSpan={2}>Actions</th>
              </tr>
          </thead>
          <tbody>
            {users.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                users.map((user,index)=>{
                    return(
                        <tr key={user.id}>
                        <th scope='row'><input type={"checkbox"} value={user.id} onChange={ updateIds } className='form-check-input'></input></th>
                        <td><NavLink to={""} className={"text-decoration-none"}>{user.username}</NavLink></td>
                        <td><i className="fa fa-edit text-primary" onClick={()=>navigate(user.id+"/edit")}></i></td>
                        <td><i className="fa fa-trash text-danger" onClick={()=>setUserId(user.id)} data-bs-toggle="modal" data-bs-target="#deleteModal"></i></td>
                  </tr>
                )})
            }
          </tbody>
      </table> 
      </div>
      <MenuBar deleteDisabled={deleteDisabled} editDisabled={editDisabled}/>    
    </>
  )
}

