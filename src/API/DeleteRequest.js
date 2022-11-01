import axios from "axios";
import { useEffect } from "react";

function DeleteRequestGetAll(url){
    useEffect(()=>{
        async function del(){
            await axios.delete(url).then(res=>console.log(res)).catch(err=>console.log(err));
        }
        del();
    })
}
function DeleteRequestSearch(url,param){
    useEffect(()=>{
        async function del(){
            await axios.delete(url,param).then(res=>console.log(res)).catch(err=>console.log(err));
        }
        del();
    })
}
export{DeleteRequestGetAll,DeleteRequestSearch}