import React, { useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import MenuBar from '../../MenuBar';
import axios from 'axios';
import { markAsDone } from '../../../API/MarkOrDeleteSelected';

export default function ListJobOffers() {
    const context = useContext(ContextUrl);
    const navigate = useNavigate()
    const [ids, setIds] = useState([]);
    const [deleteDisabled, setDeleteDisabled] = useState(true);
    const [editDisabled, setEditDisabled] = useState(true);
    const [loading,setLoading] = useState(null);
    const [datas,setDatas] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(context.url + 'joboffers/available').then(({data})=>setDatas(data)).catch((err)=>console.log(err));
        }
        fetchData();
    },[loading,context])

    const handleMarkAsDone = async () => {
      await markAsDone(ids,context.url+"joboffers/mark-as-done").finally(setLoading(true));
      setLoading(false)
      setDeleteDisabled(true);
      setEditDisabled(true);
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
                      <p>Voulez-vous marquer l'offre d'emploi comme terminée ?</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" className="btn btn-primary" onClick={handleMarkAsDone} data-bs-dismiss="modal">Marquer comme terminé</button>
                    </div>
                  </div>
                </div>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    {
                      datas.map(joboffer=>{
                          return(
                              <div className='col-md-4 card-container' key={joboffer.id}>
                                  <div className='card'>
                                      <div className='card-heading'>
                                          <span>{joboffer.title}</span>

                                      </div>
                                      <div className='card-body'>
                                          <ul className='navbar-nav'>
                                              <li className='nav-item'>Description : {joboffer.description}</li>
                                          </ul>
                                      </div>
                                      <div className='card-footer'>
                                      <div>
                                            <span className='p-1' onClick={()=>navigate(joboffer.id+"/questions")}><i className="fa fa-question text-warning fs-5" aria-hidden="true"></i>questions</span>
                                            <span className='p-1' onClick={()=>navigate(joboffer.id+"/candidates")}><i className="fa fa-user text-info fs-5" aria-hidden="true"></i>candidats</span>
                                            <span className='p-1' onClick={()=>navigate(joboffer.id+"/candidateresults")}><i className="fa fa-book text-primary fs-5" aria-hidden="true"></i>notes</span>
                                            {/* <i className="fa     "></i> */}
                                            <span className='p-1' onClick={()=>navigate(joboffer.id+"/choosedcandidates")}><i className="fa fa-plus-circle fs-5 text-success" aria-hidden="true"></i>employé</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          )
                      })
                    }
                </div>
            </div>
            <div className='container-fluid menubar'>
                <div className='btn-group' role={"group"}>
                    <button className="btn btn-success" type='button' onClick={()=>navigate("add")}><i className="fa fa-plus-circle"></i>Créer un offre d'emploi</button>
                </div>
            </div>
        </>
    )
}

