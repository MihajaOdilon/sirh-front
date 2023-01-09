import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useParams } from 'react-router-dom'
 import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function AboutEmployee() {
    const {idemployee} = useParams();
    const context = useContext(ContextUrl);
    const [employee,setEmployee] = useState([]);
    const [employeeId,setEmployeeId] = useState([]);
    const [interview,setInterview] = useState([]);
    const [startDate,setStartDate] = useState(new Date())
    const [endDate,setEndDate] = useState(new Date())
    const [baseSalary,setBaseSalary] = useState("")
    const [cnaps,setCnaps] = useState("")
    const [ostie,setOstie] = useState("")
    const [notes ,setNotes] = useState("")
    const [photo,setPhoto] = useState(null)
    const [employementContractCategories , setEmployementContractCategories] = useState([])
    const [contractCategoryId , setContractCategoryId] = useState([])
    const [disabled,setDisabled] = useState(null)
    const [loading,setLoading] =useState(null)
    const [success,setSuccess] =useState("")
    const [error,setError] =useState("")
    const [selectedImg,setSelectedImg] =useState(null)
    const file = useRef();

    let note = 0  
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(context.url+"employees/"+idemployee)
        .then(({data})=>{            
            setEmployee(data) 
        })
    },[context,idemployee,loading,success])
    useEffect(()=>{
        axios.get(context.url+"contract-categories")
        .then(({data})=>{
            setEmployementContractCategories(data)
        })
    },[context])
    useEffect(()=>{
        axios.get(context.url +"employees/"+idemployee+"/photo")
        .then(({data})=>{
            // console.log(data)
            setPhoto(data)
        })
    },[idemployee,context])
    const handleAddOstieAndCnaps = () =>{
        if(cnaps && ostie){
            axios.put(context.url+"employees/"+idemployee,null,{params:{
                "cnaps" : cnaps,
                "ostie" : ostie,
            }})
            .then(({data})=>{
                setSuccess(data)
                setTimeout(() => {
                    setSuccess()
                }, 3000);
            })
        }
    }
    const handleRenewContract = () =>{
        axios.put(context.url + "contracts/"+contractCategoryId,null,{params:{
            "baseSalary":baseSalary,
            "startDate":moment(startDate).format("YYYY-MM-DD"),
            "endDate":moment(endDate).format("YYYY-MM-DD")
        }})
        .then(({data})=>{
            setSuccess(data)
            setTimeout(() => {
                setSuccess()
            }, 3000);
        })
        .catch((err)=>{
            setError(err.response.data)
            setTimeout(() => {
                setError()
            }, 3000);
        })
    }
    const createPhoto = async () => {
        let formData = new FormData();
        formData.append('photo', photo);
        await axios.put(context.url + 'employees/' + idemployee  + '/photo', formData)
        .then(({ data }) => {
            setPhoto(null);
            if(file !== undefined) file.current.value = "";
            setSuccess(data)
            setTimeout(() => {
                setSuccess("")
            }, 3000);
        })
        .catch(({err}) => {
            console.log(err);
        })
        .finally(() => {
            console.log('FINALLY');
        });
    }
    return (
        
        <>
            <div className="modal fade" id='add__cnaps__ostie' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Renouveller OSTIE{" & "} CNAPS</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='form'>
                            <div className="form-group">
                                <label >OSTIE</label>
                                <input type="text" value={ostie} className="form-control" onChange={(e)=>setOstie(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label >CNAPS</label>
                                <input type="text" value={cnaps} className="form-control" onChange={(e)=>setCnaps(e.target.value)}/>
                            </div>
                            {
                                !(cnaps && ostie) &&
                                <div className='alert alert-warning'>{INVALID_INPUT}</div>
                            }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={ handleAddOstieAndCnaps } data-bs-dismiss={(cnaps && ostie)?"modal":null}>Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='create__photo' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Renouveller OSTIE{" & "} CNAPS</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="file" accept='.png,.jpg,.jpeg' onChange={(e) => {
                        if(e.target.files && e.target.files.length > 0){
                            setPhoto(e.target.files[0]);
                            console.log(e.target.files[0])
                        }else{
                            setPhoto(null);
                        }
                        }}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"  data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-primary" disabled={ photo === null} onClick={ createPhoto } data-bs-dismiss="modal">Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='add__contract' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Renouveller le contrat de travail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='form'>
                            <div className='form-group'>
                                <div className="form-group">
                                    <label >Salaire de base</label>
                                    <input type="number" value={baseSalary} className="form-control" onChange={(e)=>setBaseSalary(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Debut de contrat</label>
                                    <DateTimePicker
                                        className={"datetime__picker"}
                                        value={startDate}
                                        onChange={(date)=>setStartDate(date)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fin de contrat</label>
                                    <DateTimePicker
                                        className={"datetime__picker"}
                                        value={endDate}
                                        onChange={(date)=>setEndDate(date)}
                                    />
                                </div>
                                {
                                    !(endDate && startDate) &&
                                    <div className='alert alert-warning'>{"La date de debut et fin de contrat sont obligatoire"}</div>
                                }               
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={handleRenewContract} data-bs-dismiss={endDate && startDate ? "modal":null}>Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>

            {
                employee.person &&
                <div className="container-fluid employees">
                <div className='row'>
                    <div className={employee.isChoosen? "col-md card-container choosen" :"col-md card-container"} key={employee.id}>
                        <div className='card'>
                            <div className='card-heading'>
                                <span>{employee.person.name +" "+ employee.person.firstname}</span>
                                {success && <div className='alert alert-success' >{success}</div>}
                                {error && <div className='alert alert-warning'>{error}</div>}
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md card-container'>
                                        <div className='card'>
                                            <div className='card-heading'>
                                                <span>Information</span>
                                                <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create__photo"><i class="fas fa-plus-circle"></i>Photo</button>
                                            </div>
                                            <div className='card-body'>
                                                <p>{"Date de naissance: "+employee.person.dob}</p>
                                                <p>{"Cin: "+employee.person.cin}</p>   
                                                <p>{"Adresse: "+employee.person.address}</p>
                                                <p><i className='fa fa-envelope pe-1'/>{employee.person.email}</p>
                                                <p><i className='fa fa-phone pe-1'/>{employee.person.phone}</p>
                                                <p>{employee.person.gender==="m"?"Sexe: Homme":"Sexe: Femme"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        employee.contracts && employee.contracts.map(contract=>{
                                            return(
                                                <div className='col-md card-container' key={contract.id}>
                                                <div className='card'>
                                                    <div className='card-heading'>
                                                        <span>Contrat de travail</span>
                                                        {
                                                            contract.category.id!==1 &&
                                                            <button type='button' value={contract.id} className='btn btn-info text-light' onClick={(e)=>setContractCategoryId(e.target.value)} data-bs-toggle="modal" data-bs-target="#add__contract">Renouveller</button>
                                                        }
                                                    </div>
                                                    <div className='card-body'> 
                                                        {
                                                            <>                                                
                                                                <p>Categorie : {contract.category.name}</p>
                                                                <p>Date d'embauche : {employee.hiringDate}</p>
                                                                <p>Debut : {contract.startDate}</p>
                                                                {
                                                                    contract.category.id!==1 &&
                                                                    <p>Fin : {contract.endDate}</p>
                                                                }
                                                                <p>Salaire de base : {contract.baseSalary}</p>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            )

                                        })
                                    }
                                    <div className='col-md card-container' >
                                        <div className='card'>
                                            <div className='card-heading'>
                                                <span>OSTIE{" & "}CNAPS</span>
                                                <button type='button' value={employee.id} className='btn btn-info text-light' onClick={(e)=>setEmployeeId(e.target.value)} data-bs-toggle="modal" data-bs-target="#add__cnaps__ostie">Renouveller</button>
                                            </div>
                                            <div className='card-body'>
                                                <p><abbr>OSTIE: </abbr>{employee.ostie}</p>
                                                <p><abbr>CNAPS: </abbr>{employee.cnaps}</p>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {
                                interview && interview.employee && interview.employee.employeeResponses && interview.employee.employeeResponses.length!==0 && interview.employee.isChoosen===false &&
                                <div className='card-footer d-flex' style={{justifyContent:"space-between"}}>
                                    <ul className='nav'>
                                        <li className='nav-item text-secondary pe-1 '> {"Note = " + (note+(interview.bonus && interview.bonus.point))}</li>                                    
                                        {
                                            interview.remark &&
                                            <li className='nav-item text-secondary pe-1'>{"Remarque = " + interview.remark}</li>
                                        }
                                    </ul>
                                    <button type='button'className='btn' disabled={employee.isChoosen} data-bs-toggle="modal" data-bs-target="#choose__employee">
                                        <i className={employee.isChoosen?"fa fa-check-circle text-success fs-3":"fa fa-check-circle text-secondary fs-3"}></i>
                                    </button>
                                </div>
                            }
                            <div className='card-footer text-end'>
                                <div className='container-fluid p-0'>
                                <button type='button' className='btn btn-success' onClick={()=>navigate("../"+employee.id+"/vacation")}>Donnez un congé</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </> 
    )
}
