import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Context from '../../../API/Context';
import '../Department/Departments.css'

export default function Department(){
    return (
        <>
        
          <Outlet/>
        </>
    )
}

