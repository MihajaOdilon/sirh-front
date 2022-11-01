import axios from "axios";
import $ from 'jquery'
import {useEffect, useState } from "react"
const GetAndSearch = (getAllurl,getByNameUrl)=>{
    const [data,setData] = useState([])
    useEffect(()=>{
      axios.get(getAllurl).then(({ data }) => setData(data)).catch(err => {console.log(err)});
      $(document).on('input',"#search",function(e){
        const val = e.target.value
          if(val!==''){
            axios.get(getByNameUrl, {params:{"name":val}}).then(({data})=>setData(data)).catch(err => {console.log(err)});
            console.log(val)
          }
          else{
            axios.get(getAllurl).then(({ data }) => setData(data)).catch(err => {console.log(err)});
          }
      });
      return ()=>{
        $(document).off("input","#search");
      }
    },[])
    return [data];
}
export default GetAndSearch;