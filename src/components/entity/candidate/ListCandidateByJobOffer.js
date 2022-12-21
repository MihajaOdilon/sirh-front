import React, { useContext, useEffect, useState } from 'react'  
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

export default function ListCandidateByJobOffer() {
    const {idjoboffer} = useParams();
    const navigate = useNavigate();
    const [criteria,setCriteria] = useState("");
    const [candidates,setCandidates] = useState([]);
    const context = useContext(ContextUrl);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(context.url + "candidates" ,{params:{"jobOfferId":idjoboffer}})
            .then(({data})=>{
                setCandidates(data)
            })
        }
        fetchData()
    },[context,idjoboffer])
    useEffect(()=>{
        if(criteria){
            axios.get(context.url + "candidates/sort", {params:{"jobOfferId":idjoboffer,"criteria":criteria}}).then(({data})=>setCandidates(data));
        }
    },[criteria,idjoboffer,context]);
    return (
        <div className='candidates'>
            <div className='container-fluid  list'>
                <table className='table'>
                    <thead>
                        <tr>
                            <td colSpan={5}>
                                <div className='container-fluid menu_bar text-end'>
                                    <button type="button" className='btn'>Tri : </button>
                                    <button type="button" className='btn' value={"degree"} onClick={(e)=>{setCriteria(e.target.value)}}>Diplôme</button>
                                    <button type="button" className='btn' value={"experience"} onClick={(e)=>{setCriteria(e.target.value)}}>Experience</button>
                                    <button type="button" className='btn' value={"age"} onClick={(e)=>{setCriteria(e.target.value)}}>Age</button>
                                    {/* <button type="button" className='btn pe-0' value={"note"} onClick={(e)=>{setCriteria(e.target.value)}}>Note</button> */}
                                </div>
                            </td>
                        </tr>
                        <tr className=''>
                            <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                            <th scope='col'>Nom</th>
                            <th scope='col'>Sexe</th>       
                            <th scope='col'>Age</th>
                            <th scope='col'>Entretient</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidates.length!==0 &&
                            candidates.map((candidate,index)=>{
                                return(
                                    <tr key={candidate.id} value={candidate.id} id="mark">
                                        <th scope='row'>
                                            <input type={"checkbox"} value={candidate.id} className='form-check-input'/>
                                        </th>
                                        <td><NavLink to={candidate.id+"/about"} className={"nav-link"}>{candidate.person.name +" "+ candidate.person.firstname}</NavLink></td>
                                        <td>{candidate.person.gender==="m"?"Homme":"Femme"}</td>
                                        <td>{candidate.person.age + " ans"}</td>
                                            <td><i className="fa fa-plus-circle" onClick={()=>navigate("../"+idjoboffer+'/interviews/'+candidate.id)}></i></td>                                           
                                    </tr>
                                )
                            })
                        }
                        {
                            candidates.length===0 &&
                            <tr><td colSpan={5}>Aucun candidat ici</td></tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='container-fluid menubar'>
                <div className='btn-group' role={"group"} style={{padding:"7px 0"}}>
                    <button className="btn btn-success" type='button' onClick={()=>navigate("add")}><i className="fa fa-plus-circle"></i>Ajouter un(e) candidat(e)</button>
                </div>
            </div>  
        </div>
    )
}
