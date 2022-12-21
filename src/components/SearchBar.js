import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './style/SearchBar.css'
export default function SearchBar() {
    const [q ,setq] = useState("");
    const {pathname} = useLocation();
    useEffect(()=>{
        setq("");
    },[pathname]);
    return (
        <div className='search-bar'>
            <input className='' type={"text"} value={q} placeholder='Recherche' id='search' onChange={(e)=>setq(e.target.value)}></input>
        </div>
    )
}
