import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
// import { useMediaQuery } from 'react-responsive';
import { NavLink, useNavigate } from 'react-router-dom'
import { setMe } from '../redux/actions/userAction';
import './style/Header.css'

export default function Header(props) {
    const classnameQuery = useMediaQuery({query : '(min-width : 768px)'}) ? 'dropdown dropstart' : 'dropdown dropend d-inline';
    // const classnameHeight = useMediaQuery({query : '(min-width : 768px)'}) ? 'header h-25' : 'header h-25';
    const [isCollapse,setCollapse] = useState(true);
    const classname = isCollapse? "fa fa-arrow-circle-down":"fa fa-times text-danger";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = (e)=>{
        e.preventDefault();
        localStorage.removeItem('accessToken');
        navigate('/login');
        dispatch(setMe(null));
    }
    
    return (
        <header className={"header p-0"}>
            <nav className="navbar navbar-expand-md p-0">
                <ul className="navbar-nav d-inline">
                    <li><NavLink className={"nav-link text-nowrap"} to={"/"}>SIRH</NavLink></li>
                </ul>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setCollapse(!isCollapse)}>
                    <span className={classname}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto text-nowrap">
                        <li className="nav-item"><NavLink className="nav-link" to={"/dashboard"}>Tableau de bord</NavLink></li>  
                        <li className="nav-item"><NavLink className="nav-link" to={"/contact"}>Contact</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to={"/m"}>A propos</NavLink></li>
                    </ul>
                    <div className={classnameQuery}>
                        <button type="button" className="btn" data-bs-toggle="dropdown">
                            <span><img src='pu.png' alt='' width={"25px"} height={"25px"} className='rounded-circle'/></span>
                            <span> UserName</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><NavLink to={"/profil"} className="dropdown-item">Mon profil</NavLink></li>
                            <li><NavLink to={"/setting"} className="dropdown-item">Paramètres</NavLink></li>
                            <li><NavLink to={"/deconnection"} className="dropdown-item" onClick={handleClick}>Deconnexion</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
  )
}


