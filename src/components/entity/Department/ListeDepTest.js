import React, { useContext } from 'react'
import ContextUrl from '../../../API/Context';
import GetAndSearch from '../../../API/GetAndSearch';
// import { DataTable , Column } from 'primereact';
export default function ListeDepTest() {
    const context = useContext(ContextUrl)
    const [data] = GetAndSearch(context.url + "departments",context.url + "departments/search");
    const columns = [
        {field:'id',header:'Id'},
        {field:'name',header:'Nom'}
    ];
    const dynamicColums = columns.map((col,i)=>{
        // return <Column key={col.field} field={col.field} header={col.header}></Column>
    })
    return (
        // <DataTable value={data}>
            {dynamicColums}
        // </DataTable>
    )
}
