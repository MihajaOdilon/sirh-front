import React, { memo } from 'react'
import Collapsible from 'react-collapsible'
import { Sidebar, Menu } from 'react-pro-sidebar'
import { NavLink } from 'react-router-dom'
import "./style/Sidebar.css"

export default memo(function SidebarComponent() {

    return (
        <Sidebar className='sidebar' collapsedWidth="0">

            <Menu className=''>
                <Collapsible trigger={[<span className='text-nowrap'><i className={'fa fa-home text-primary fs-3 sidebar-icon'}/>Gestionnaire</span>,<i className={'fa fa-caret-down'}/>]}>
                    <ul className='navbar-nav'>
                        <li className="nav-item"><NavLink className="nav-link" end to={"department"}>Département</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"job_category"}>Catégorie professionnelle</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"job"}>Emploi</NavLink></li>
                    </ul>
                </Collapsible>
                {/* <Collapsible trigger={[<span className='text-nowrap'><i className={'fa fa-home text-primary fs-3 sidebar-icon'}/>Employe</span>,<i className={'fa fa-caret-down'}/>]}>
                    <ul className='navbar-nav'>
                        <li className="nav-item"><NavLink className="nav-link" to={"job"} id='employe'>Employe</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"job_category"}>Catégorie d'emploie</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"job_offer"}>Offre d'emploie</NavLink></li>
                    </ul>
                </Collapsible> */}
                {/* <span className='trigger'><NavLink className="nav-link" to={"department"}><span className='text-nowrap'><i className={'fa fa-home text-primary fs-3 sidebar-icon'}/>Departement</span></NavLink></span> */}
                {/* <span className='trigger'><NavLink className="nav-link" to={"entity2"}>Itemmmmmmmmm 2</NavLink></span> */}
            </Menu>
        </Sidebar>
    )
})
