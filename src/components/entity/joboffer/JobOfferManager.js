import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function JobOfferManager() {
    return (
        <div class="container-fluid p-0">
            <ul className='navbar nav joboffer__menu'>
                <li className='nav-item '><NavLink to={"questions"} className={"text-decoration-none"}>Questions</NavLink></li>
                <li className='nav-item '><NavLink to={"candidates"} className={"text-decoration-none"}>Candidats</NavLink></li>
                <li className='nav-item '><NavLink to={"interviews"} className={"text-decoration-none"}>Entretient</NavLink></li>
                <li className='nav-item '><NavLink to={"candidateresults"} className={"text-decoration-none"}>Note</NavLink></li>
                <li className='nav-item'><NavLink to={"choosedcandidates"} className={"text-decoration-none"}>Choisi</NavLink></li>
            </ul>
            <Outlet/>
        </div>

    )
}
