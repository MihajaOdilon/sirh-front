import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';

export default function JobByJobCategory() {
    const {idjobcategory} = useParams();
    console.log(idjobcategory);
    const [jobCategory,setJobCategory] = useState([]);
    const context = useContext(ContextUrl);
    useEffect(()=>{
        axios.get(context.url + "jobcategories/" + idjobcategory).then(({data})=>setJobCategory(data));
    },[context,idjobcategory])
    return (
        <ul>
            {jobCategory && jobCategory.jobs && jobCategory.jobs.map((job)=>{
                return(
                    <>
                        <li key={job.id}>{job.name}</li>
                    </>
                )
            })}
        </ul>
    )
}