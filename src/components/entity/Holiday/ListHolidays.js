import React, { useContext, useEffect, useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context'
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"
export default function ListHolidays() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate();
    const [ids, setIds] = useState([]);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [editDisabled, setEditDisabled] = useState(true);
    const [holidays,setholidays] = useState([]);
    const [holidayId,setHolidayId] = useState([]);
    const [msg,setMsg] = useState();
    
    useEffect(()=>{
      async function fetchData(){
          await axios.get(context.url + 'holidays').then(({data})=>setholidays(data));
      }
      fetchData();
    },[msg,context])
    const confirmDelete = () => {
      axios.delete(context.url+"holidays",{params:{"holidayId":holidayId}})
      .then(({data})=>{
          setMsg(data);
          setTimeout(() => {
              setMsg();
          }, 3000);
      })
      setIds([])
      setDeleteDisabled(true);
      setEditDisabled(true)
    }
    useEffect(()=>{
        $(document).on('input',"#search",function(e){
            const val = e.target.value
              if(val!==''){
                axios.get(context.url+"holidays/search", {params:{"name":val}})
                .then(({data})=>setholidays(data))
              }
              else{
                axios.get(context.url + 'holidays').then(({data})=>setholidays(data))
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
      setDeleteDisabled(ids.length === 0)
      setEditDisabled(ids.length !== 1)
    }
    // useEffect(()=>{
    //     $(function(){
    //       $('#edit').on('click', function(){
    //         if(editDisabled === false){
    //           navigate(ids[0] + '/edit')
    //         }
    //       });
    //     });
    // },[editDisabled,ids,navigate])

    return (
      <>
        <div className="modal fade" id='deleteModal' tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Suppression!</h5>
              </div>
              <div className="modal-body">
                <p>Voulez-vous supprimer cet jour ferié?</p>
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
                        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                </div>
            }
            <table className='table'>
                <thead>
                <tr className=''>
                    <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                    <th scope='col'>Nom</th>
                    <th scope='col'>Date</th>
                    <th scope='col' colSpan={2}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {holidays.length===0? <tr><td colSpan={5}>Aucun élément</td></tr> :
                    holidays.map((holiday,index)=>{
                        return(
                        <tr key={holiday.id}>
                            <th scope='row'><input type={"checkbox"} value={holiday.id} onChange={updateIds} className='form-check-input'></input></th>
                            <td>{holiday.name}</td>
                            <td>{holiday.date}</td>
                            <td><button type='button' className='btn' onClick={()=>navigate(holiday.id+"/edit")}><i className="fa fa-edit text-primary"/></button></td>
                            <td><button type='button' className='btn'  onClick={()=>setHolidayId(holiday.id)} data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fa fa-trash text-danger"/></button></td>
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
