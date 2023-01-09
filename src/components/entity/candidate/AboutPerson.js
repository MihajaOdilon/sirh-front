import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { useNavigate, useParams } from 'react-router-dom'
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';

export default function AboutPerson() {
    const {idcandidate,idjoboffer} = useParams();
    const context = useContext(ContextUrl);
    const [candidate,setCandidate] = useState([]);
    const [candidateId,setCandidateId] = useState([]);
    const [cv,setCv] = useState(null);
    const [coverLetter,setCoverLetter] = useState(null);
    const file = useRef();

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
    const [dateInterview,setDateInterview] = useState();
    const [notes ,setNotes] = useState()
    const [loading,setLoading] =useState("")
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
    },[context,idcandidate,loading,success])
    const handleChooseCandidate = () =>{
        setLoading("Wait a minute...")
        axios.put(context.url + "candidates/"+idcandidate+"/choose-candidate",null,null)
        .then(({data})=>{
            setLoading("")
            setSuccess(data)
            setTimeout(() => {
                setSuccess("")
                navigate("..")
            }, 3000);
            // navigate("../../"+idjoboffer+"/choosedcandidates")
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        async function fetchDegreeCategories(){
            await axios.get(context.url+"degreecategories")
            .then(({data})=>{setDegreeCategories(data)})
        }
        fetchDegreeCategories();
    },[context]);


    const createCV = async () => {
        let formData = new FormData();
        formData.append('cv', cv);
        await axios.put(context.url + 'candidates/' + idcandidate  + '/pdf-cv', formData)
        .then(({ data }) => {
            setCv(null);
            // if(file !== undefined) file.current.value = "";
            setSuccess(data)
            setTimeout(() => {
                setSuccess("")
            }, 3000);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('FINALLY');
        });
    }
    const createLM = async () =>{
        let formData = new FormData();
        formData.append('coverLetter', coverLetter);
        await axios.put(context.url + 'candidates/' + idcandidate  + '/pdf-cover-letter', formData)
        .then(({ data }) => {
            setCoverLetter(null);
            // if(file !== undefined) file.current.value = "";
            setSuccess(data)
            setTimeout(() => {
                setSuccess("")
            }, 3000);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('FINALLY');
        });
    }

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
                }, 3000);
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
                setSuccess("E-mail à été envoyé à " + candidate.person.email)
                setTimeout(() => {
                    setSuccess("")
                }, 3000);
            })
        }

    }
    const handleCreateInterview = (e) =>{
        e.preventDefault()
        if(dateInterview){
            setLoading("Entendez quelques secondes...")
            axios.post(context.url+"interviews",null,{params:{
                "candidateId":candidateId,
                "offerId":idjoboffer,   
                "dateTime":moment(dateInterview).format("YYYY-MM-DDTHH:mm")
            }})
            .then(()=>{
                setLoading("")
                setSuccess("E-mail à été envoyé à " + candidate.person.email)
                setTimeout(() => {
                    setSuccess("")
                }, 3000);
            })
            .catch(err=>console.log(err))
        }      
    }

    return (
        
        <>
            <div className="modal fade" id='choose__candidate' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-success">Confirmation</h5>
                    </div>
                    <div className="modal-body">
                        <p>Voulez-vous choisir cet candidat et envoyer un e-mail?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-success" onClick={handleChooseCandidate} data-bs-dismiss="modal">Confirmer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='create__cv' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-success">CV</h5>
                    </div>
                    <div className="modal-body">
                        <input type="file" accept='.pdf,.xpdf' ref={ file } onChange={(e) => {
                        if(e.target.files && e.target.files.length > 0){
                            setCv(e.target.files[0]);
                        }else{
                            setCv(null);
                        }
                        }}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-success" disabled={ cv === null} onClick={ createCV } data-bs-dismiss="modal">Enregistrer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='create__lm' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-success">LM</h5>
                    </div>
                    <div className="modal-body">
                        <input type="file" accept='.pdf,.xpdf' ref={ file } onChange={(e) => {
                        if(e.target.files && e.target.files.length > 0){
                            setCoverLetter(e.target.files[0]);
                            console.log(e.target.files[0])
                        }else{
                            setCoverLetter(null);
                        }
                        }}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-success" disabled={ coverLetter === null} onClick={ createLM } data-bs-dismiss="modal">Enregistrer</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id='create__interview' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Création d'entretient!</h5>
                    </div>
                        <div className="modal-body">
                            <form className='form'>
                                <div className="form-group">
                                    <label>Date d' entretient</label>
                                    <DateTimePicker
                                        className={"datetime__picker"}
                                        value={dateInterview}
                                        onChange={(date)=>setDateInterview(date)}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button onClick={handleCreateInterview} className="btn btn-primary" data-bs-dismiss={dateInterview?"modal":null}>Confirmer</button>
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
                            <form className='form'>
                                <div className="form-group">
                                    <label >Title</label>
                                    <input type="text" className="form-control" onChange={(e)=>setDegreeTitle(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label >Etablissemnt</label>
                                    <input type="text" className="form-control" onChange={(e)=>setEstablishment(e.target.value)}/>
                                </div>
                                <div className='row'>
                                    <div className='col-md'>
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
                                    </div>  
                                    <div className='col-md'>
                                        <div className="form-group pt-1 ">
                                            <label >Année</label>
                                            <DateTimePicker
                                            className={"datetime__picker p-0 m-0"}
                                            value={year}
                                            onChange={(date)=>setYear(date)}
                                        />
                                    </div>
                                    </div>
                                </div>

                                {
                                    !(degreeTitle && establishment && degreeCategoryId && year) &&
                                    <div className='alert alert-warning'>{INVALID_INPUT}</div>
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitAddDegree} data-bs-dismiss={degreeTitle && establishment && degreeCategoryId && year ? "modal":null}>Confirmer</button>
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
                            <form className='form'>
                                <div className="form-group">
                                    <label>Titre</label>
                                    <input type="text" className="form-control" value={expTitle} onChange={(e)=>setExpTitle(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Societé</label>
                                    <input type="text" className="form-control" value={company} onChange={(e)=>setCompany(e.target.value)}/>
                                </div>
                                <div className='row'>
                                    <div className='col-md'>
                                        <div className="form-group">
                                            <label>Date de debut</label>
                                            <DateTimePicker
                                            className={"datetime__picker"}
                                            value={startDate}
                                            onChange={(date)=>setStartDate(date)}
                                        />
                                    </div>
                                    </div>
                                    <div className='col-md'>
                                        <div className="form-group">
                                            <label>Date fin</label>
                                            <DateTimePicker
                                                className={"datetime__picker"}
                                                value={endDate}
                                                onChange={(date)=>setEndDate(date)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {
                                    !(expTitle && company && startDate && endDate) &&
                                    <div className='alert alert-warning'>{INVALID_INPUT}</div>
                                }
                            </form>                    
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" onClick={handleSubmitAddExp} className="btn btn-primary" data-bs-dismiss={expTitle && company && endDate && startDate ? "modal":null}>Confirmer</button>
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
                                        <span>{loading}</span>
                                    }
                                    {
                                        success &&
                                        <div className='alert alert-success'>{success}</div>
                                    }
                                    {
                                        candidate.isChoosen &&
                                        <button type='button' className='btn btn-primary text-light' onClick={()=>navigate("../"+candidate.person.id+"/addemployee")}>Devenir employé</button>
                                    }
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md card-container'>
                                            <div className='card'>
                                                <div className='card-heading'>
                                                    <span>Informations</span>
                                                    <div className='btn-group'>
                                                        <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create__cv"><i class="fas fa-plus-circle"></i>CV</button>
                                                        <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#create__lm"><i class="fas fa-plus-circle"></i>LM</button>
                                                    </div>
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
                                                    <div className='card-body job__offer'>
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
                                                    <div className='card-body job__offer'>
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
                                    interview && interview.candidate && interview.candidate.candidateResponses && interview.candidate.candidateResponses.length!==0 && !interview.candidate.isChoosen &&
                                    <div className='card-footer d-flex' style={{justifyContent:"space-between"}}>
                                        <ul className='nav'>
                                            {
                                                interview.remark!==null &&
                                                <li className='nav-item text-secondary pe-1'>{"Remarque = " + interview.remark}</li>
                                            }
                                        </ul>
                                        <button type='button'className='bg-primary text-light' disabled={candidate.isChoosen} data-bs-toggle="modal" data-bs-target="#choose__candidate">
                                            <i className="fas fs-5 fa-check-circle"></i>
                                            Choisir cet(te) candidat(e)
                                        </button>
                                    </div>
                                }
                                {
                                    !interview &&
                                    <div className='card-footer text-end'>
                                        <div className='container-fluid p-0 text-end'>
                                            <button type='button' className='bg-primary text-light' onClick={()=>setCandidateId(candidate.id)} data-bs-toggle="modal" data-bs-target="#create__interview">
                                                <i className={"fa fa-plus-circle"}/>
                                                <span>Créer l'entretient</span>
                                            </button>
                                        </div>
                                    </div>
                                }
                                {
                                    interview && interview.candidate && interview.candidate.candidateResponses && interview.candidate.candidateResponses.length===0 && !interview.candidate.isChoosen &&
                                    <div className='card-footer'>
                                        <ul className='nav'>
                                            {
                                                <li className='nav-item text-secondary pt-1'>Date d'entretient : {moment(interview.dateTime).format("DD/MM/YYYY") + " à " + moment(interview.dateTime).format("HH:mm")}</li>
                                            }
                                        </ul>
                                        <button type='button' className='bg-primary text-light' onClick={()=>navigate("../"+ interview.candidate.id + "/addresponse")}><i className="fas fa-book-reader    "></i> Faire l'entretient</button>

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
