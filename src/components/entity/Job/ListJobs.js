import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context'
import MenuBar from '../../MenuBar';
import axios from 'axios';
import $ from "jquery"
import { joinPaths } from '@remix-run/router';
export default function ListJobs() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate();
    const [ids, setIds] = useState([]);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [editDisabled, setEditDisabled] = useState(true);
    const [jobs,setJobs] = useState([]);
    const [job,setJob] = useState([]);
    const [jobId,setJobId] = useState([]);
    const [jobofferTitle,setJobofferTitle] = useState("");
    const [jobofferDescription,setJobofferDescription] = useState("");
    const [msg,setMsg] = useState([]);
    const [loading,setLoading] = useState();
    
    useEffect(()=>{
      async function fetchData(){
          await axios.get(context.url + 'jobs').then(({data})=>setJobs(data));
      }
      fetchData();
    },[msg,context,loading])
    // useEffect(()=>{
    //   async function fetchData(){
    //       await axios.get(context.url + 'jobs/'+jobId).then(({data})=>setJob(data));
    //   }
    //   fetchData();
    // },[jobId,context])
    const confirmDelete = async () => {
      axios.delete(context.url+"jobs/"+jobId)
      .then(({data})=>{
          setMsg(data);
          setTimeout(() => {
              setMsg([]);
          }, 1500);
      })
    }
    const handleSubmitAdd = async (e) => {
      e.preventDefault();
      if(jobofferTitle && jobofferDescription && jobId){
          await axios.post(context.url + 'joboffers' ,null, {params:{
              "title":jobofferTitle,
              "description":jobofferDescription,
              "jobId":jobId}})
          .then(()=>{
            setJobofferTitle('')
            setJobofferDescription('')
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            }, 1500);
          })
      }
      else{

      }
  }
    useEffect(()=>{
        $(document).on('input',"#search",function(e){
          const val = e.target.value
            if(val!==''){
              axios.get(context.url+"jobs/search", {params:{
                  "name":val
              }})
              .then(({data})=>setJobs(data))
            }
            else{
              axios.get(context.url + 'jobs').then(({data})=>setJobs(data));
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
        }
        else{
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
        <div className="modal fade" id='create__joboffer' tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Création d'offre!</h5>
              </div>
              <div className="modal-body">
              <form className='form'>
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" className="form-control" value={jobofferTitle} onChange={(e)=>setJobofferTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" value={jobofferDescription} onChange={(e)=>setJobofferDescription(e.target.value)}/>
                </div>
            </form>     
            </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                <button type="button" className="btn btn-primary" onClick={ handleSubmitAdd } data-bs-dismiss={jobofferTitle && jobofferDescription?"modal":null}>Confirmer</button>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid list'>
            {msg && <div className='alert bg-danger'>{msg}</div>}
            {loading && <div className='alert bg-success'>Un offre créer avec succès</div>}
            <table className='table'>
                <thead>
                <tr className=''>
                    <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                    <th scope='row'>Nom</th>
                    <th scope='row' colSpan={3}>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {jobs.length===0? <tr><td colSpan={3}>Aucun élément</td></tr> :
                      jobs.map((job,index)=>{
                        const disabled = job.jobOffers && job.jobOffers.length!==0?true:false
                        return(
                            <tr key={job.id}>
                                <th scope='row'><input type={"checkbox"} disabled={disabled} value={job.id} onChange={updateIds} className='form-check-input'></input></th>
                                <td>
                                  <NavLink to={""} className={"text-decoration-none"}>
                                    {job.name}
                                  </NavLink>
                                </td>
                                <td><button type='button' className='btn' onClick={()=>navigate(job.id+"/edit")}><i className="fa fa-edit text-primary"></i></button></td>
                                <td><button type='button' className='btn' disabled={disabled} onClick={()=>setJobId(job.id)} data-bs-toggle="modal" data-bs-target="#deleteModal"><i className={disabled?"fa fa-trash text-secondary":"fa fa-trash text-danger"}/></button></td>
                                <td>
                                    <button type='button' className='btn' onClick={()=>setJobId(job.id)} data-bs-toggle="modal" data-bs-target="#create__joboffer">
                                        <i className={"fa fa-plus-circle text-success"}/>
                                        {
                                            job.jobOffers && job.jobOffers.length!==0 &&
                                            <span>{job.jobOffers.length}</span>
                                        }
                                    </button>
                                </td>                               
                            </tr>
                      )})
                  }
                </tbody>
            </table>
        </div>
        <MenuBar deleteDisabled={deleteDisabled} editDisabled={ editDisabled }/>
        </>
    )
}
