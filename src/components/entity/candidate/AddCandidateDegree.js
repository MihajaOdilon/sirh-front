import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';
export default function AddCandidateDegree(){
const {idcandidate} = useParams();
const [degreeCategories,setDegreeCategories] = useState([]);
const [candidate,setCandidate] = useState([]);
const [degreeCategoryId,setDegreeCategoryId] = useState(1);
const [degreeCategoryName,setDegreeCategoryName] = useState("Certificat/Brevet");
const [establishment,setEstablishment] = useState("")
const [title,setTitle] = useState("");
const [year,setYear] = useState(new Date());
const [loading,setLoading] = useState(null);
const [msg,setMsg] = useState("")
const context = useContext(ContextUrl);
const navigate = useNavigate()
useEffect(()=>{
    axios.get(context.url+"candidates/"+idcandidate)
    .then(({data})=>{            
        setCandidate(data) 
    })
},[context,idcandidate])
useEffect(()=>{
    async function fetchDegreeCategories(){
        await axios.get(context.url+"degreecategories")
        .then(({data})=>{setDegreeCategories(data)})
    }
    fetchDegreeCategories();
},[context]);
const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if(idcandidate && degreeCategoryId && establishment && title && year){
        await axios.post(context.url + 'degrees' ,null, {params:{
            "personId":candidate.person.id,
            "degreeCatId":degreeCategoryId,
            "title":title,
            "establishment":establishment,
            "year":moment(year).format("YYYY"),
        }})
        .then(()=>{
            navigate("../"+candidate.id+"/about")
        })
    }
    else{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false)
        },1500)
    }
}
const handleSelectDegreeCategory = (e) =>{
    setDegreeCategoryName(e.target.name);
    setDegreeCategoryId(e.target.value)
}

  return (
    <>
        {msg && <div className='alert bg-success'>{msg}</div>}
        <form onSubmit={handleSubmitAdd} className='form'>
            <div className="form-group">
              <label >Title</label>
              <input type="text" className="form-control" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
              <label >Etablissemnt</label>
              <input type="text" className="form-control" onChange={(e)=>setEstablishment(e.target.value)}/>
            </div>
            <div className="dropdown">
              <label >Catégorie</label>
              <button type="button" className="btn select" data-bs-toggle="dropdown">
                <span>{degreeCategoryName}</span>
              </button>
              <div className="dropdown-menu">
                  <div className='container-fluid item'>
                      {degreeCategories.map((degreecategory)=>{
                          return <button type='button' key={degreecategory.id} value={degreecategory.id} name={degreecategory.name} className="dropdown-item" onClick={(e)=>handleSelectDegreeCategory(e)}>{degreecategory.name}</button>
                      })}
                  </div>
              </div>
          </div>
          <div className="form-group">
                <label >Année</label>
                <DateTimePicker
                className={"datetime__picker"}
                value={year}
                onChange={(date)=>setYear(date)}
                />
            </div>
            {loading && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
            <div className='container-fluid menubar p-0'>
                <div className='btn-group' role={"group"} aria-label="">
                    <button className="btn btn-warning text-light" type='button' onClick={()=>navigate("../"+candidate.id+"/about")}><i className="fa fa-times"></i> Annuler</button>
                    <button className="btn btn-success" type='submit'><i className="fa fa-check"></i> Confirmer</button>
                </div>
            </div>
        </form>
    </>
  )
}
