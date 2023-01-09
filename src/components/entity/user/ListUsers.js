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
  const [msg,setMsg] = useState();
  
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
              setMsg()
          }, 3000);
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
                <h5 className="modal-title text-danger">Suppression!</h5>
              </div>
              <div className="modal-body">
                <p>Voulez-vous supprimer cet utilisateur?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" className="btn btn-danger" onClick={ confirmDelete } data-bs-dismiss="modal">Supprimer</button>
              </div>
            </div>
          </div>
      </div>
      <div className='container-fluid list'>
          {
              msg &&
              <div className="toast show">
                  <div class="toast-header alert-danger">
                      {msg}
                  </div>
              </div>
          }
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
                        <td>{user.username}</td>
                        <td><button type='button' className='btn' onClick={()=>navigate(user.id+"/edit")}><i className="fa fa-edit text-primary"/></button></td>
                        <td><button type='button' className='btn'  onClick={()=>setUserId(user.id)} data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fa fa-trash text-danger"/></button></td>
                  </tr>
                )})
            }
          </tbody>
      </table> 
      </div>
      <div className='container-fluid p-1 d-flex justify-content-between'>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><button className="page-link">Previous</button></li>
                    <li class="page-item"><button className="page-link">1</button></li>
                    <li class="page-item"><button className="page-link">2</button></li>
                    <li class="page-item"><button className="page-link">3</button></li>
                    <li class="page-item"><button className="page-link">Next</button></li>
                </ul>
            </nav>
            <MenuBar deleteDisabled={deleteDisabled}/>
        </div>
    </>
  )
}

