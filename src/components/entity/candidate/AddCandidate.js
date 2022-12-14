import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { MenuBarConfirm } from '../../MenuBar';
import moment from 'moment';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import DateTimePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css"
import "react-calendar/dist/Calendar.css"
export default function AddCandidate(){
    const {idjoboffer} = useParams()
    const [name , setName] = useState("");
    const [firstname , setFirstname] = useState("");
    const [dob , setDob] = useState();
    const [email , setEmail] = useState("");
    const [address , setAddress] = useState("");
    const [cin , setCin] = useState("");
    const [phone , setPhone] = useState("");
    const [gender , setGender] = useState("");
    const context = useContext(ContextUrl);
    const [isValid,setValid] = useState(null);
    const [errorMsg,setErrorMsg] = useState("")
    const navigate = useNavigate()
    console.log(moment(dob).format("YYYY-MM-DD"))
    const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if(name && firstname && dob && email && address && cin && phone && gender){
        await axios.post(context.url + 'persons' , {
            "name":name,
            "firstname":firstname,
            "dob":moment(dob).format("YYYY-MM-DD"),
            "email": email,
            "address":address,
            "cin":cin,
            "phone":phone,
            "gender":gender
        })
        .then(({data})=>{
            axios.post(context.url + 'candidates' ,null, {params:{
                "jobOfferId":idjoboffer,
                "personId" : data.id
            }})
            .then(()=>{
                navigate("..")
            })

        })
        .catch((err)=>{
            setErrorMsg(err.response.data)
            setTimeout(()=>{
                setErrorMsg("");
            },3000)
        });
        }
    else{
        setValid(true);
        setTimeout(() => {
            setValid(false);
        }, 3000);
    }
  }

    return (
    <>
        <form onSubmit={handleSubmitAdd} className='form'>
            <div className="row">
                <div className="col-md">
                    <div className="form-group">
                        <label >Nom</label>
                        <input type="text"value={name} className="form-control" onChange={(e)=>setName(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <label >Pr??nom</label>
                        <input type="text" value={firstname} className="form-control" onChange={(e)=>setFirstname(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <div className="form-group">
                        <label>Date de naissance</label>
                        <DateTimePicker
                            className={"datetime__picker"}
                            value={dob}
                            onChange={(date)=>setDob(date)}
                            disableClock
                        />
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <label >N?? CIN</label>
                        <input type="number" value={cin} className="form-control" onChange={(e)=>setCin(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <label >Adresse</label>
                        <input type="text" value={address} className="form-control" onChange={(e)=>setAddress(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md">
                    <div className="form-group">
                        <label >Adresse e-mail</label>
                        <input type="email" value={email} className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-group">
                        <label >T??l??phone</label>
                        <input type="number" value={phone} className="form-control" onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="form-check-inline">
                <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optRadio" value={"m"} onChange={(e)=>setGender(e.target.value)}/>
                homme
                </label>
            </div>
            <div className="form-check-inline">
                <label className="form-check-label">
                <input type="radio" className="form-check-input" name="optRadio" value={"f"} onChange={(e)=>setGender(e.target.value)}/>
                Femme
                </label>
            </div>
            {isValid && <div className='alert alert-warning'>{INVALID_INPUT}</div>}
            {errorMsg && <div className='alert alert-warning'>{errorMsg}</div>}
            <MenuBarConfirm/>
        </form>
    </>
    )
}
