/* eslint-disable no-mixed-spaces-and-tabs */
import Navbar from "./Navbar";
import {Column , useTable} from 'react-table';
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../Api/services/DocumentService";

const Columns = [ {
    Header: 'Fichiers',
    accessor: 'fichier'
},
{
    Header: 'Nombre de signataires',
    accessor: 'nombre de signataires'
},
{
    Header: 'Signé par',
    accessor: 'nombre de signatures'
},
{
    Header: 'Type de service',
    accessor: 'Type de service'
},
{
    Header: 'Status',
    accessor: 'status'
},


] as Column[];



const data:any= [
    {
        id: 1,
        fichier: 'fichier1',
        'nombre de signataires': 2,
        'nombre de signatures': 2,
        'Type de service': 'service1',
        status: 'en cours'
    }
]


const CitizenDashboard = ()=>{
  const [documents, setDocuments] = useState<Document[]>([]);
  useEffect(() => {
    console.log(localStorage.getItem('user'));
    documentService.getDocuments().then((documents) => { 
      setDocuments(documents);
    }).catch((error) => {
      console.error(error);});
  }, []);
  // useEffect(() => {
  //     if (!documents) return;
  //     documents.forEach((doc:Document) => {
  //       data.push({
  //         id: doc.id?doc.id:0,
  //         fichier: doc.name?doc.name:'unknown',
  //         'nombre de signataires': doc.citoyenIds?doc.citoyenIds.length:0,
  //         'nombre de signatures': doc.citoyenIds?doc.citoyenIds.length:0,
  //         'Type de service': doc.type,
  //         status: doc.status?doc.status.toString():'en cours'
  //       })
  //     });
  //   }, [documents]);
    const nav = useNavigate();
    const userData = useMemo(() => data, []);
    const columns = useMemo(()=>Columns,[])
    const { getTableProps , getTableBodyProps , headerGroups , rows , prepareRow }= useTable<any>({ columns, data:userData })
        
    return (
        <>
          <>
        <Navbar isAuthenticated={true}/>
<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-bold text-2xl">Dashboard</h2>
			
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
				
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
				<div className="inline-block min-w-full shadow rounded-lg ">
					<table className="min-w-full leading-normal " {...getTableProps()}>
						<thead>
                            {headerGroups.map((headerGroup)=>((
							<tr {...headerGroup.getHeaderGroupProps()} >
                               {headerGroup.headers.map((column)=>(
							   <th {...column.getHeaderProps()} className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    {column.render('Header')}
                                </th>
								
								))}
							
                                </tr>)))}
							
						</thead>
						<tbody  {...getTableBodyProps()} >
							
  {  rows.map((row) => {
    prepareRow(row);
	
    return (
      <tr {...row.getRowProps()} className="px-5 py-5 border-b border-gray-200 bg-white text-sm "
      onClick={() => {
        nav(`/signer/${row.original.id}`);
    }}>
        {row.cells.map((cell) => {

			
          return (
            <td {...cell.getCellProps()} className="  px-5 py-5  border-b border-gray-200 bg-white text-sm font-semibold">
              <div className="flex items-center">
                
                <div className="ml-3">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {cell.render('Cell')}
                  </p>
                </div>
              </div>
            </td>
          );
        })}
	
      </tr>
    );
  })}
</tbody>

                            
					</table>
					
					
				</div>
			</div>
		</div>
	</div>
    </>
        </>
    )
  }
  export default CitizenDashboard;



