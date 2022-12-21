import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function JobOfferManager() {
    return (
        <div>
            <div className='container-fluid menubar'>
                <ul className='navbar nav p-0'>
                    <li className='nav-item'><NavLink to={"candidates"} className={"text-decoration-none"}><i className="fa fa-users"/>Candidat</NavLink></li>
                    <li className='nav-item'><NavLink to={"/"} className={"text-decoration-none"}><i className="fa fa-table"/>Entretient</NavLink></li>
                    {/* <li className='nav-item'><NavLink to={"questions"} className={"text-decoration-none"}><i className="fa fa-question"/>Question</NavLink></li> */}
                </ul>
            </div>
            <Outlet/>
        </div>
    )
}
