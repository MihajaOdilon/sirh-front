import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import "./style/Sidebar.css"

export default function SidebarComponent() {
return (
        <div className='sidebar' collapsedWidth="0">
            <SearchBar/>
            <div className='container-fluid menu'>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#manager" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className={"text-nowrap"}>Gestionnaire<i className="fa fa-angle-down" aria-hidden="true"/></span>
                </button>
                <div className="collapse navbar-collapse" id="manager">
                    <ul className='navbar-nav'>
                        <li className="nav-item"><NavLink className="nav-link" to={"departments"}><i className=""></i>Département </NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"jobcategories"}><i className=""/>Catégorie professionnelle</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"jobs"}><i className=""/>Emploie</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"holidays"}><i className=""/>Jour ferié</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"users"}><i className=""/>Utilisateur</NavLink></li>
                    </ul>
                </div>
                <ul className='navbar-nav test'>
                    <li className="nav-item"><NavLink className="nav-link" to={"joboffers"}><i className=""></i>Offre d'emploi</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to={"employees"}><i className=""/>Employés</NavLink></li>
                </ul>
            </div>
        </div>
    )
}
