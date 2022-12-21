import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';

export default function JobByDepartment() {
    const {iddepartment} = useParams();
    const [department,setDepartment] = useState([]);
    const context = useContext(ContextUrl);
    useEffect(()=>{
        axios.get(context.url + "departments/" + iddepartment).then(({data})=>setDepartment(data));
    },[context,iddepartment])
    return (
        <ul>
            {department && department.jobs && department.jobs.map((job)=>{
                return(
                    <>
                        <li key={job.id}>{job.name}</li>
                    </>
                )
            })}
        </ul>
    )
}
