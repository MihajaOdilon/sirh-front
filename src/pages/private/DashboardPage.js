import { useProSidebar } from 'react-pro-sidebar';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import "../pagestyles/Pages.css"
import "../../components/style/Table.css"
import "../../components/style/Form.css"
import "../../components/style/Modal.css"
import "../../components/style/DatePicker.css"
import "../../components/style/Styles.css"
import "../../components/style/Sidebar.css"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMe } from '../../redux/actions/userAction';
import { decodeToken } from 'react-jwt';
import SearchBar from '../../components/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../../components/Footer';
export default function DashboardPage(){
    const { pathname } = useLocation();
    const { me } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {collapseSidebar} = useProSidebar();
    const [isCollapse,setCollapse] =useState(false)
    const classname = isCollapse? "fa fa-arrow-circle-right text-secondary" : "fa fa-arrow-circle-left text-secondary";
    function onClick() {
        collapseSidebar();
        setCollapse(!isCollapse);
    }
    const CollapseButton = ()=>{
      return <li className='nav-item d-inline-block sidebarCollapseButton' onClick={()=>onClick()}><i className={classname} style={{fontSize:"28px"}}></i></li>
    }
    
    useEffect(() => {
      let accessToken = localStorage.getItem('accessToken');
      if(accessToken){
        if(me == null){
          dispatch(setMe(decodeToken(accessToken)));
        }
      }else{
        navigate("/login");
      }
    }, [pathname, me, navigate, dispatch]);
    return (
      <>
          <div className='dashboard'> 
                  <div className="offcanvas offcanvas-start p-0" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                      <div className="offcanvas-header p-0">
                          <h2 id="offcanvasRightLabel" className=""> S.I.R.H</h2>
                          <button type="button" data-bs-dismiss="offcanvas" className='btn p-2' aria-label="Close"><i class="fas fa-times fs-3"></i></button>
                      </div>
                      <div className="offcanvas-body p-0">
                          <div className='sidebar'>
                              <div className='container-fluid p-0 menu'>
                                  <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#manager" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                      <span className={"text-nowrap"}><span><FontAwesomeIcon style={{color:"black",fontSize:"1.2rem"}} icon={"laptop-code"}/> Gestionnaire</span><i className="fa fa-angle-down" aria-hidden="true"/></span>
                                  </button>
                                  <div className="collapse navbar-collapse" id="manager">
                                      <ul className='navbar-nav'>
                                          <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"departments"}><FontAwesomeIcon style={{color:"black",fontSize:"1rem"}} icon={"house-laptop"}/> Départements</NavLink></li>
                                          <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"jobcategories"}><FontAwesomeIcon style={{color:"black",fontSize:"1rem",width:"1.2rem"}} icon={"money-check"}/> Catégories professionnelles</NavLink></li>
                                          <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"jobs"}><FontAwesomeIcon style={{color:"black",fontSize:"1rem",width:"1.1rem"}} icon={"person-shelter"}/> Emploie</NavLink></li>
                                          <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"holidays"}><i className=""/><FontAwesomeIcon style={{color:"black",fontSize:"1rem",width:"1.2rem"}} icon={"calendar-day"}/> Jours feriés</NavLink></li>
                                          <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"users"}><i className=""/><FontAwesomeIcon style={{color:"black",fontSize:"1rem",width:"1.2rem"}} icon={"users"}/> Utilisateurs</NavLink></li>
                                      </ul>
                                  </div>
                                  <ul className='navbar-nav test'>
                                      <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"joboffers"}><FontAwesomeIcon style={{color:"black",fontSize:"1.2rem" ,width:"1.6rem"}} icon={"newspaper"}/>Offre d'emploi</NavLink></li>
                                      <li className="nav-item" data-bs-dismiss="offcanvas"><NavLink className="nav-link" to={"employees"}><FontAwesomeIcon style={{color:"black",fontSize:"1.2rem" ,width:"1.6rem"}} icon={"laptop-file"}/>Employés</NavLink></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <Header collapsebutton={<CollapseButton/>}/>
                  <div className='container-fluid sidebar__icon'>
                      <div className='d-flex' style={{justifyContent:"space-between"}}>
                          <div className='btn-group'>
                              <button className="btn p-0 ps-1 pt-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa fa-bars fs-4"></i></button>
                          </div>                    
                          <SearchBar/>
                      </div>
                  </div>
                  <div className='' style={{paddingTop:"40px"}}>
                      <Outlet/>
                  </div>
                <Footer/>
          </div>
      </>
    )
}

