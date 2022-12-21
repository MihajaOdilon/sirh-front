import React, { useContext, useEffect, useState } from 'react'  
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

export default function CandidateResults() {
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
                        <tr>
                            <td colSpan={6}>
                                <div className='container-fluid menu_bar text-end'>
                                    <button type="button" className='btn'>Tri : </button>
                                    <button type="button" className='btn' value={"degree"} onClick={(e)=>{setCriteria(e.target.value)}}>Diplôme</button>
                                    <button type="button" className='btn' value={"experience"} onClick={(e)=>{setCriteria(e.target.value)}}>Experience</button>
                                    <button type="button" className='btn' value={"age"} onClick={(e)=>{setCriteria(e.target.value)}}>Age</button>
                                    <button type="button" className='btn pe-0' value={"note"} onClick={(e)=>{setCriteria(e.target.value)}}>Note</button>
                                </div>
                            </td>
                        </tr>
                        <tr className=''>
                            <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                            <th scope='col'>Nom</th>
                            <th scope='col'>Note</th>w
                        </tr>
                    </thead>
                    <tbody>
                        {candidateResults.length===0? <tr><td colSpan={5}>Aucun élément</td></tr> :
                            candidateResults.map((candidateResult,index)=>{
                                if(!candidateResult.candidate.isChoosen){
                                    return(
                                        <tr key={candidateResult.id} value={candidateResult.id} id="mark">
                                            <th scope='row'>
                                                <input type={"checkbox"} value={candidateResult.candidate.id} onChange={ updateIds } className='form-check-input'/>
                                            </th>
                                            <td><NavLink to={"../"+idjoboffer+"/candidates/"+ candidateResult.candidate.id+"/about"} className={"nav-link"}>{candidateResult.candidate.person.name +" "+ candidateResult.candidate.person.firstname}</NavLink></td>
                                            <td>{candidateResult.total}</td>
                                        </tr>
                                    )
                                }

                            })
                        }
                    </tbody>
                </table>
            </div> 
        </div>
    )
}
