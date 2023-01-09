import React, { useContext, useEffect, useState } from 'react'  
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../../API/Context';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

export default function ListeCandidatesResults() {
    const {idjoboffer} = useParams();
    const navigate = useNavigate();
    const [criteria,setCriteria] = useState("");
    const [candidates,setCandidates] = useState([]);
    const [candidateResults,setCandidatesResults] = useState([]);
    const [candidateId,setCandidateId] = useState();
    const [ChooseDisabled,setChooseDisabled] = useState(true);
    const [ids,setIds] = useState([]);
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
        axios.get(context.url+"joboffers/candidate-result",{params:{"offerId":idjoboffer}})
        .then(({data})=>{
            setCandidatesResults(data)
        })
    },[context,idjoboffer])
    useEffect(()=>{
        if(criteria){
            axios.get(context.url + "candidates/sort", {params:{
                "jobOfferId":idjoboffer,
                "criteria":criteria
            }})
            .then(({data})=>setCandidates(data));
        }
    },[criteria,idjoboffer,context]);
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
        setChooseDisabled(ids.length === 0);
        console.log(ids)
    }
    return (
        <div className='candidates'>
            <div className='container-fluid  list'>
                <table className='table'>
                    <thead>
                        <tr className=''>
                            <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                            <th scope='col' colSpan={""}>Nom</th>
                            <th scope='col' colSpan={""}>Note</th>
                            <th scope='col' colSpan={""}>Action</th>    
                        </tr>
                    </thead>
                    <tbody>
                        {candidateResults.length===0? <tr><td colSpan={5}>Aucun élément</td></tr> :
                            candidateResults.map((candidateResult,index)=>{
                                // if(!candidateResult.candidate.isChoosen){
                                    return(
                                        <tr key={candidateResult.id} value={candidateResult.id} id="mark">
                                            <th scope='row'>
                                                <input type={"checkbox"} value={candidateResult.candidate.id} onChange={ updateIds } className='form-check-input'/>
                                            </th>
                                            <td>
                                                {candidateResult.candidate.person.name +" "+ candidateResult.candidate.person.firstname}
                                            </td>
                                            <td>{candidateResult.total}</td>    
                                            <td>
                                                {
                                                    !candidateResult.candidate.isChoosen ?
                                                    <button type='button' className='btn' onClick={()=>navigate(candidateResult.candidate.id+"/about")}><i className="fas fa-check-circle text-primary" aria-hidden="true"></i></button>
                                                    :
                                                    <button type='button' className='btn'><i className="fas fa-check text-success" aria-hidden="true"></i></button>
                                                }
                                            </td>
                                        </tr>
                                    )       
                            })
                        }
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

