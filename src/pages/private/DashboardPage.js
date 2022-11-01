import { useProSidebar } from 'react-pro-sidebar';
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SidebarComponent from '../../components/SidebarComponent'
import "../pageStyles/Pages.css"
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
export default function DashboardPage(){
    const { collapseSidebar } = useProSidebar();
    const [isCollapse,setCollapse] =useState(false)
    const classname = isCollapse? "fa fa-arrow-circle-right text-white fs-4" : "fa fa-arrow-circle-left text-danger fs-4";
    function onClick() {
        collapseSidebar();
        setCollapse(!isCollapse)
    }
    const CollapseButton = ()=><span onClick={()=>onClick()} className='pe-2'><i className={classname}></i></span>
    return (
        <div className='dashboard'> 
            <div style={{"display":"flex","height":"100vh"}} className="">
                <SidebarComponent/>
                <div className='container-fluid p-0 main' width="100%">
                <Header className={'container-fluid p-1 header position-sticky'} CollapseButton={<CollapseButton/>} SearchBar={<SearchBar/>}/>
                    <div className="">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>

    )
}

