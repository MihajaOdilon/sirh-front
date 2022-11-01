import React, { useState } from 'react'
// import { useMediaQuery } from 'react-responsive';
import { NavLink } from 'react-router-dom'
import './style/Header.css'

export default function Header(props) {
    // const classname = useMediaQuery({query : '(min-width : 768px)'}) ? 'dropdown dropstart' : 'dropdown dropend d-inline';
    const [isCollapse,setCollapse] = useState(true);
    const classname = isCollapse? "fa fa-bars fs-5 text-white":"fa fa-times fs-4 text-danger";
    return (
        <header className={props.className} CollapseButton={props.CollapseButton} SearchBar={props.SearchBar}>
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav d-inline">
                    <li className="nav-item d-inline-block">{props.CollapseButton}</li>
                    <li className="nav-item d-inline-block"><NavLink className="nav-link" to={"/"} end>Accueil</NavLink></li>
                </ul>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setCollapse(!isCollapse)}>
                    <span className={classname}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item"><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"/m"}>A propos</NavLink></li>
                        <li className="nav-item"><NavLink end className="nav-link" to={"/dashboard_page"}>SD</NavLink></li>
                    </ul>
                    {/* <div className={classname}>
                        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
                            <span><img src='pu.png' alt='pu' width={"30px"} height={"30px"} className='rounded-circle'/></span>
                            <span> UserName</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><NavLink to={"/profil"} className="dropdown-item">Mon profil</NavLink></li>
                            <li><NavLink to={"/setting"} className="dropdown-item">Paramètres</NavLink></li>
                            <li><NavLink to={"/deconnection"} className="dropdown-item">Deconnexion</NavLink></li>
                        </ul>
                    </div> */}
                    <div className=''>{props.SearchBar}</div>
                </div>
            </nav>
        </header>
  )
}


