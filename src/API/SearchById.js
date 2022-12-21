import { useEffect, useState } from "react"
import $ from 'jquery'
import axios from "axios";
const SearchById = (url)=>{
    const [data,setdata] = useState([]);
    useEffect(()=>{
        $(document).on('input','#search',function(e){
            const val = e.target.value;
            if(val!==""){
                axios.get(url+val).then(({data})=>setdata(data)).catch((err)=>console.log(err));
                console.log(val)
            }
        })
        return ()=>{
            $(document).off('input','#search');
        }
    },[])
    return [data];
}
export  default SearchById;