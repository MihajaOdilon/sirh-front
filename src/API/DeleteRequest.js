import axios from "axios";

const deleteSelectedUsingPara = async (ids, url)=>{
    await ids.map(id=>(
        axios.delete(url ,{params:{"holidayId":id}}).then(({data})=>console.log(data)).catch((err)=>console.log(err))));
    console.log(ids);
}
export default deleteSelectedUsingPara;