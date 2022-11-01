import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
      <div className='container-fluid p-1 text-end'>
          <button className='btn btn-primary p-1'><NavLink to="edit_department" className={"text-decoration-none text-white"}>Modifier</NavLink></button>
          <button className='btn btn-success p-1'><NavLink to="add_department" className={"text-decoration-none text-white"}>Ajouter</NavLink></button>
      </div>
  )
}
