import React from 'react'
import './style/SearchBar.css'
export default function SearchBar() {
  return (
    <div className='search-bar'>
        <input type={"text"} placeholder='Recherche' id='search'></input>
        <i className='fa fa-search search-icon text-secondary'></i>
    </div>
  )
}
