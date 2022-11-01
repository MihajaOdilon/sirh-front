import axios from "axios";
import { useEffect, useState } from "react"

const FetchAll = (url)=>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        axios.get(url)
        .then(({ data }) => {
          setData(data);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
        })
    },[]);
    return [data];
}
export default FetchAll;