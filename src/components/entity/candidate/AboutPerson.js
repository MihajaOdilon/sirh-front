import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function AboutPerson() {
    const {idcandidate} = useParams();
    const context = useContext(ContextUrl);
    const [candidate,setCandidate] = useState([]);

    //degree
    const [degreeCategories,setDegreeCategories] = useState([]);
    const [degreeCategoryId,setDegreeCategoryId] = useState(1);
    const [degreeCategoryName,setDegreeCategoryName] = useState("Certificat/Brevet");
    const [establishment,setEstablishment] = useState("")
    const [degreeTitle,setDegreeTitle] = useState("");
    const [year,setYear] = useState(new Date());

    //experience
    const [expTitle , setExpTitle] = useState("");
    const [company,setCompany] = useState("");
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())

    const [interview,setInterview] = useState([]);
    const [notes ,setNotes] = useState()
    const [loading,setLoading] =useState(null)
    const [success,setSuccess] = useState("")
    let note = 0  
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(context.url+"candidates/"+idcandidate)
        .then(({data})=>{            
            setCandidate(data) 
        })
    },[context,idcandidate,loading,success])
    useEffect(()=>{
        axios.get(context.url+"interviews",{params:{"candidateId":idcandidate}})
        .then(({data})=>setInterview(data[0]))
    },[context,idcandidate,loading])
    interview && interview.candidate && interview.candidate.candidateResponses.map(response=>{
        return note+=response.mark
    })
    const handleChooseCandidate = () =>{
        setLoading(true)
        axios.put(context.url + "candidates/"+idcandidate+"/choose-candidate",null,null)
        .then(()=>{
            setTimeout(() => {
                setLoading(false)
            });
        })
    }
    useEffect(()=>{
        async function fetchDegreeCategories(){
            await axios.get(context.url+"degreecategories")
            .then(({data})=>{setDegreeCategories(data)})
        }
        fetchDegreeCategories();
    },[context]);
    const handleSubmitAddDegree = async (e) => {
        e.preventDefault();
        if(idcandidate && degreeCategoryId && establishment && degreeTitle && year){
            await axios.post(context.url + 'degrees' ,null, {params:{
                "personId":candidate.person.id,
                "degreeCatId":degreeCategoryId,
                "title":degreeTitle,
                "establishment":establishment,
                "year":moment(year).format("YYYY"),
            }})
            .then(({data})=>{
                setSuccess(data)
                setTimeout(() => {
                    setSuccess("")
                }, 2000);
            })
        }
    }
    const handleSelectDegreeCategory = (e) =>{
        setDegreeCategoryName(e.target.name);
        setDegreeCategoryId(e.target.value)
    }
    const handleSubmitAddExp = async (e) => {
        e.preventDefault();
        if(idcandidate && expTitle && company && startDate && endDate){
            await axios.post(context.url+"experiences",null,{params:{
                "personId":candidate.person.id,
                "title":expTitle,
                "company":company,
                "startDate":moment(startDate).format("YYYY-MM-DD"),
                "endDate":moment(endDate).format("YYYY-MM-DD")
            }})
            .then(({data})=>{
                setSuccess(data)
                setTimeout(() => {
                    setSuccess("")
                }, 2000);
            })
        }

    }

    return (
        
        <>
            <div className="modal fade" id='choose__candidate' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Voulez-vous choisir cet candidat et envoyer un e-mail?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={handleChooseCandidate} data-bs-dismiss="modal">Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='add__degree' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajout du diplôme!</h5>
                        </div>
                        <div className="modal-body">
                            <form className='form' onSubmit={handleSubmitAddDegree}>
                                <div className="form-group">
                                    <label >Title</label>
                                    <input type="text" className="form-control" onChange={(e)=>setDegreeTitle(e.target.value)}/>
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
                                {
                                    !(degreeTitle && establishment && degreeCategoryId && year) &&
                                    <div className='alert bg-warning'>{INVALID_INPUT}</div>
                                }
                                <div className='container-fluid menubar p-0'>
                                    <div className='btn-group' role={"group"} aria-label="">
                                        <button className="btn btn-warning text-light" type='button' data-bs-dismiss="modal">Annuler</button>
                                        <button className="btn btn-success" type='submit' data-bs-dismiss={degreeTitle && establishment && degreeCategoryId && year ? "modal":null}>Confirmer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='add__experience' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Ajout d'experience!</h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmitAddExp} className='form'>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" className="form-control" value={expTitle} onChange={(e)=>setExpTitle(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Societé</label>
                                    <input type="text" className="form-control" value={company} onChange={(e)=>setCompany(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Date de debut</label>
                                    <DateTimePicker
                                    className={"datetime__picker"}
                                    value={startDate}
                                    onChange={(date)=>setStartDate(date)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Date fin</label>
                                    <DateTimePicker
                                        className={"datetime__picker"}
                                        value={endDate}
                                        onChange={(date)=>setEndDate(date)}
                                    />
                                </div>
                                {
                                    !(expTitle && company && startDate && endDate) &&
                                    <div className='alert bg-warning'>{INVALID_INPUT}</div>
                                }        
                                <div className='container-fluid menubar p-0'>
                                    <div className='btn-group' role={"group"} aria-label="">
                                        <button className="btn btn-warning text-light" type='button' data-bs-dismiss="modal">Annuler</button>
                                        <button className="btn btn-success" type='submit' data-bs-dismiss={expTitle && company && endDate && startDate ? "modal":null}>Confirmer</button>
                                    </div>
                                </div>
                            </form>                    
                        </div>
                    </div>
                </div>
            </div>
            {
                candidate.person &&
                <div className="container-fluid candidates">
                    <div className='row'>
                        <div className={candidate.isChoosen? "col-md card-container choosen" :"col-md card-container"} key={candidate.id}>
                            <div className='card'>
                                <div className='card-heading'>
                                    <span style={{paddingTop:"5px",whiteSpace:"nowrap"}}>{candidate.person.name +" "+ candidate.person.firstname}</span>
                                    {
                                        loading &&
                                        <span>Wait a minutes...</span>
                                    }
                                    {
                                        success &&
                                        <div className='alert bg-success'>{success}</div>
                                    }
                                    <div className='btn-group' role={"group"} aria-label="Add  degree and experience">
                                        {
                                            candidate.isChoosen &&
                                            <button type='button' className='btn btn-primary text-light' onClick={()=>navigate("../../../employees/"+candidate.person.id+"/addemployee")}>Devenir employeur</button>
                                        }
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md card-container'>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <span>Informations</span>
                                                </div>
                                                <div className='card-body'>
                                                    <p>{"Date de naissance: "+candidate.person.dob}</p>
                                                    <p>{"Cin: "+candidate.person.cin}</p>   
                                                    <p>{"Adresse: "+candidate.person.address}</p>
                                                    <p><i className='fa fa-envelope pe-1'/>{candidate.person.email}</p>
                                                    <p><i className='fa fa-phone pe-1'/>{candidate.person.phone}</p>
                                                    <p>{candidate.person.gender==="m"?"Sexe: Homme":"Sexe: Femme"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md card-container'>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <span>Diplomes</span>
                                                    <button type='button' className='btn p-0' data-bs-toggle="modal" data-bs-target="#add__degree"><i className="fa fa-plus-circle text-primary fs-5"/></button>
                                                </div>
                                                {
                                                    candidate.person.degrees.length !== 0 &&
                                                    <div className='card-body'>
                                                        {
                                                            candidate.person.degrees.map((degree)=>{
                                                                return <p key={degree.id}>{degree.year+" : "+ degree.title}</p>
                                                            })
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div> 
                                        <div className='col-md card-container'>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <span>Experiences</span>
                                                    <button type='button' className='btn p-0' data-bs-toggle="modal" data-bs-target="#add__experience"><i className="fa fa-plus-circle text-primary fs-5"/></button>
                                                </div>
                                                {
                                                    candidate.person.experiences.length !== 0 &&
                                                    <div className='card-body'>
                                                        {
                                                            candidate.person.experiences.map((experience,index)=>{
                                                                return <p key={experience.id} className='nav-item'>{moment(experience.startDate).format("YYYY/MM/DD") +" - "+ moment(experience.endDate).format("YYYY/MM/DD") + " : " + experience.title + " à la société " + experience.company}</p>
                                                            })
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    interview && interview.candidate && interview.candidate.candidateResponses && interview.candidate.candidateResponses.length!==0 && interview.candidate.isChoosen===false &&
                                    <div className='card-footer d-flex' style={{justifyContent:"space-between"}}>
                                        <ul className='nav'>
                                            <li className='nav-item text-secondary pe-1 '> {"Note = " + (note+(interview.bonus && interview.bonus.point))}</li>                                    
                                            {
                                                interview.remark!==null &&
                                                <li className='nav-item text-secondary pe-1'>{"Remarque = " + interview.remark}</li>
                                            }
                                        </ul>
                                        <button type='button'className='btn p-0' disabled={candidate.isChoosen} data-bs-toggle="modal" data-bs-target="#choose__candidate">
                                            <i className={candidate.isChoosen?"fa fa-check-circle text-success fs-3":"fa fa-check-circle text-secondary fs-3"}></i>
                                        </button>
                                    </div>
                                }
                            </div>                           
                        </div>
                    </div>
                </div>
            }
        </> 
    )
}
