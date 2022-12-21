import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';

export default function ChoosedCandidate() {
    const [choosedCandidates,setChoosedCandidates] = useState([]);
    const context = useContext(ContextUrl)
    const navigate = useNavigate()
    const {idjoboffer} = useParams()
    useEffect(()=>{
        axios.get(context.url+"candidates/choosen",{params:{"offerId":idjoboffer}})
        .then(({data})=>{
            setChoosedCandidates(data)
        })
    },[context,idjoboffer])
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        choosedCandidates &&
                        choosedCandidates.map((candidate,index)=>{
                            // candidate.
                            return(
                                <div className={"col-md-6 card-container"} key={candidate.id}>
                                    <div className='card'>
                                        <div className='card-heading'>
                                            <span style={{paddingTop:"5px",whiteSpace:"nowrap"}}>{candidate.person.name +" "+ candidate.person.firstname}</span>
                                            <div className='btn-group' role={"group"} aria-label="Add  degree and experience">
                                                <button type='button' className='btn btn-primary text-light' onClick={()=>navigate("../../employees/"+candidate.person.id+"/addemployee")}>Devenir employeur</button>                                   
                                            </div>
                                        </div>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-md'>
                                                    <p>{"Date de naissance: "+candidate.person.dob}</p>
                                                    <p>{"Cin: "+candidate.person.cin}</p>   
                                                    <p>{"Adresse: "+candidate.person.address}</p>
                                                    <p><i className='fa fa-envelope pe-1'/>{candidate.person.email}</p>
                                                    <p><i className='fa fa-phone pe-1'/>{candidate.person.phone}</p>
                                                    <p>{candidate.person.gender==="m"?"Sexe: Homme":"Sexe: Femme"}</p>
                                                </div>
                                                <div className='col-md'>
                                                    {candidate.person.degrees.length !== 0 &&
                                                        <div className='container-fluid p-0'>
                                                            <p>Diplômes:</p>
                                                            {
                                                                candidate.person.degrees.map((degree)=>{
                                                                    return <p key={degree.id}>{degree.title}</p>
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                    {candidate.person.experiences.length !== 0 &&
                                                        <div className='container-fluid p-0'>
                                                            <p>Experiences:</p>
                                                            {
                                                                candidate.person.experiences.map((experience,index)=>{
                                                                    return <p key={experience.id} className='nav-item'>{experience.title}</p>
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        choosedCandidates.length===0 &&
                        <div className='card-container'>Aucun candidat choisi ici...</div>
                    }
                </div>
            </div>
        </>
    )
}
