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
    const [candidateId,setCandidateId] = useState([]);
    const [interview,setInterview] = useState([]);
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
    useEffect(()=>{
        axios.get(context.url+"interviews",{params:{"candidateId":candidateId}})
        .then(({data})=>setInterview(data[0]))
    })
    return (
        <div className='candidates'>
            {/* <div className='container-fluid p-0'>
                <div className='btn-group p-0' role={"group"}>
                    <button type="button" className='btn p-0 pe-1 ps-1'>Tri : </button>
                    <button type="button" className='btn p-0 pe-1 ps-1' value={"degree"} onClick={(e)=>{setCriteria(e.target.value)}}>Diplôme</button>
                    <button type="button" className='btn p-0 pe-1 ps-1' value={"experience"} onClick={(e)=>{setCriteria(e.target.value)}}>Experience</button>
                    <button type="button" className='btn p-0 pe-1 ps-1' value={"age"} onClick={(e)=>{setCriteria(e.target.value)}}>Age</button>
                </div>

            </div> */}
            
            <div className='container-fluid  list'>
                <table className='table'>
                    <thead>
                        <tr className=''>
                            <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                            <th scope='col'>Nom</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            candidates.length!==0 &&
                            candidates.map((candidate,index)=>{
                                if(candidate.candidateResponses.length===0){
                                    return(
                                        <tr key={candidate.id} value={candidate.id} id="mark">
                                            <th scope='row'>
                                                <input type={"checkbox"} value={candidate.id} className='form-check-input'/>
                                            </th>
                                            <td>
                                                {candidate.person.name +" "+ candidate.person.firstname}
                                            </td>
                                            <td>{candidate.person.age}</td>
                                            <td>
                                                <button className='btn pb-1' onClick={()=>navigate(candidate.id+"/about")}><i className="fas fa-info-circle text-info"></i></button>                                                                             
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        {
                            candidates.length===0 &&
                            <tr><td colSpan={6}>Aucun candidat ici</td></tr>
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
