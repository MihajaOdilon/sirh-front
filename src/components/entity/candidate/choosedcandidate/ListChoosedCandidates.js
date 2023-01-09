import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../../API/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListChoosedCandidates() {
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
        <div className='container-fluid list'>
            <table className='table'>
                <thead>
                    <tr className=''>
                        <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                        <th scope='col'>Nom</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {choosedCandidates.length===0? <tr><td colSpan={4}>Aucun élément</td></tr> :
                        choosedCandidates.map((choosed,index)=>{
                            return(
                                <tr key={choosed.id}>
                                    <th scope='row'><input type={"checkbox"} value={choosed.id} className='form-check-input'></input></th>
                                    <td>{choosed.person.name + " " + choosed.person.firstname}</td>
                                    <td><button type='button' className='btn' onClick={()=>navigate(choosed.id+"/about")}><FontAwesomeIcon className='text-primary' icon={"person-circle-plus"}/></button></td>
                                </tr>
                        )})
                    }
                </tbody>
            </table> 
      </div>
    )
}

