import React, { useContext, useState} from 'react'
import { NavLink } from 'react-router-dom';
import { memo } from 'react';
import ContextUrl from '../../../API/Context';
import GetAndSearch from '../../../API/GetAndSearch';
import Menu from '../../Menu';

export default memo( function ListesDepartments() {
  const context = useContext(ContextUrl);
  const [checked,setChecked] = useState([]);
  const [data] = GetAndSearch(context.url + "departments",context.url + "departments/search");
  const handlechange = (data)=>{
      const isChecked = checked.some(check=>check.value===data.value);
      if(isChecked){
        setChecked(checked.filter((check)=>check.value!==data.value))
      }
      else{
        setChecked(checked.concat(data))
      }
  }
  return (
    <>
      <Menu/>
      <table className='table table-dark'>
          <thead>
              <tr className=''>
                  <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                  <th scope='col'>Nom</th>
              </tr>
          </thead>
          <tbody>
            {data.map((department,index)=>{
              return(
              <tr key={department.id}>
                  <th scope='row'><input type={"checkbox"}  className='form-check-input'></input></th>
                  <td><NavLink to={""} className={"text-decoration-none"}>{department.name}</NavLink></td>
              </tr>
              )
            })}
          </tbody>
      </table>
    </>
  )
})

