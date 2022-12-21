import axios from 'axios';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import ContextUrl from '../../../API/Context';
import { INVALID_INPUT } from '../../../redux/constants/alertConstants';
import { MenuBarConfirm } from '../../MenuBar';
export default function AddHoliday(){
    const [name , setName] = useState("");
    const [date , setDate] = useState(new Date());
    const context = useContext(ContextUrl);
    const [loading,setLoading] = useState(null);
    const [msg,setMsg] = useState(null)
    const navigate = useNavigate()
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        if(name && date){
            await axios.post(context.url + 'holidays' , {
                "name":name,
                "date":moment(date).format("YYYY-MM-DD")
            })
            .then(()=>{
                setMsg(true);
                // setName("");
                // setDate(new Date())
                navigate("..")
                setTimeout(() => {
                    setMsg(false);
                }, 1500);
            })
        }
        else{
            setLoading(true);
            setTimeout(()=>{
                setLoading(false);
            },1000)
        }
    }

    return (
        <> 
            {msg && <div className='alert bg-success'>Jour ferié crée avec succès</div>}  
            <form onSubmit={handleSubmitAdd} className='form'>
                <div className="form-group">
                  <label>Nom</label>
                  <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <ReactDatePicker
                    selected={date}
                    onChange={(date)=>setDate(date)}
                    dateFormat={"dd-MM-yyyy"}
                    />
                </div>
                {loading && <div className='alert bg-warning'>{INVALID_INPUT}</div>}
                <MenuBarConfirm/>
            </form>
        </>
    )
}
