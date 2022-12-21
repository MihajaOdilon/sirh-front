import axios from 'axios';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar'

export default function EditHoliday() {
    const {idholiday}  = useParams();
    const context = useContext(ContextUrl);
    const [name,setName] = useState("");
    const [date, setDate] = useState();
    const [msg,setMsg] = useState("");
    const [loading,setLoading] = useState(null);
    const [isValid,setValid] = useState("");
    useEffect(()=>{
        axios.get(context.url + 'holidays/' + idholiday).then(({data})=>{
            setName(data.name);
            setDate(data.date); 
        }).catch((err)=>console.log(err));
    },[context,idholiday]);
    const handleSubmitEdit = async(e)=>{
        e.preventDefault()
        if(name && date){//error time value rhf vide ny date(à corrigé)
            await axios.put(context.url + 'holidays/' ,null, {params:{
                "holidayId":idholiday,
                "date":moment(date).format("YYYY-MM-DD"),
                "name":name}})
            .then(({data})=>{
                setMsg(data)})
                setLoading(true)
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
        }
        else{
            setValid(true);
            setTimeout(() => {
                setValid(false)
            }, 1500);
        }
    }
    return (
        <>
            {loading && <div className='alert bg-info'>{msg}</div>}
            <form onSubmit={handleSubmitEdit} className='form'>
                <div className="form-group">
                  <label>Nom du jour ferié</label>
                  <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <ReactDatePicker    
                    selected={moment(date).toDate()}
                    onChange={(date)=>setDate(date)}
                    showMonthYearPicker
                    dateFormat={"dd-MM-yyyy"}
                    />
                </div>
                {isValid && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
                <MenuBarConfirm/>
            </form>
        </>
    )
}
