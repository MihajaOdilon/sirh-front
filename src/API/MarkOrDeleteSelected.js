import axios from "axios";
const deleteSelected = async (ids, url)=>{
    await ids.map(id=>(
        axios.delete(url+id).then(({data})=>console.log(data)).catch((err)=>console.log(err))
    ))
    console.log(ids);
}
const deleteSelectedUsingParam = async (ids, url)=>{
    await ids.map(id=>(
        axios.delete(url ,{params:{"holidayId":id}}).then(({data})=>console.log(data)).catch((err)=>console.log(err))));
    console.log(ids);
}
const markAsDone = async (ids, url)=>{
    await ids.map(id=>(
        axios.put(url,null,{params:{"offerId":id}})));
    }
export default deleteSelected;
export {deleteSelectedUsingParam,markAsDone};