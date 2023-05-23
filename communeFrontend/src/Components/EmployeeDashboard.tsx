/* eslint-disable no-mixed-spaces-and-tabs */

import Navbar from "./Navbar";
import {Column , useTable} from 'react-table';
import { useMemo } from "react";

const myColumns =[
	{
		Header: 'Nom',
		accessor: 'nom'
	},
	{
		Header: 'Fichiers',
		accessor: 'fichier'
	},
	{
		Header: 'Crée le',
		accessor: 'crée le'
	},
	{
		Header: 'Nombre de signataires',
		accessor: 'nombre de signataires'
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

  
const data = [
	{
	  nom: "John Doe",
	  fichier: "fichier1.pdf",
	  "crée le": "2023-05-22",
	  "nombre de signataires": 10,
	  "Type de service": "Certification",
	  status: "en cours",
	},
	{
	  nom: "Jane Smith",
	  fichier: "fichier2.pdf",
	  "crée le": "2023-05-21",
	  "nombre de signataires": 5,
	  "Type de service": "Légalisation",
	  status: "refusé",
	},
	{
	  nom: "Alice Johnson",
	  fichier: "fichier3.pdf",
	  "crée le": "2023-05-20",
	  "nombre de signataires": 7,
	  "Type de service": "Légalisation",
	  status: "accepté",
	},
	{
	  nom: "Bob Anderson",
	  fichier: "fichier4.pdf",
	  "crée le": "2023-05-19",
	  "nombre de signataires": 3,
	  "Type de service": "Certification",
	  status: "en cours",
	},
	{
	  nom: "Sarah Williams",
	  fichier: "fichier5.pdf",
	  "crée le": "2023-05-18",
	  "nombre de signataires": 8,
	  "Type de service": "Légalisation",
	  status: "en cours",
	},
	{
	  nom: "Michael Brown",
	  fichier: "fichier6.pdf",
	  "crée le": "2023-05-17",
	  "nombre de signataires": 12,
	  "Type de service": "Certification",
	  status: "accepté",
	},
	{
	  nom: "Emily Davis",
	  fichier: "fichier7.pdf",
	  "crée le": "2023-05-16",
	  "nombre de signataires": 4,
	  "Type de service": "Légalisation",
	  status: "refusé",
	},
	{
	  nom: "David Wilson",
	  fichier: "fichier8.pdf",
	  "crée le": "2023-05-15",
	  "nombre de signataires": 6,
	  "Type de service": "Certification",
	  status: "accepté",
	},
	{
	  nom: "Olivia Thomas",
	  fichier: "fichier9.pdf",
	  "crée le": "2023-05-14",
	  "nombre de signataires": 9,
	  "Type de service": "Légalisation",
	  status: "en cours",
	},
	{
	  nom: "James Miller",
	  fichier: "fichier10.pdf",
	  "crée le": "2023-05-13",
	  "nombre de signataires": 2,
	  "Type de service": "Certification",
	  status: "en cours",
	},
  ];
   
  

const EmployeeDashboard = () => {
	const userData = useMemo(() => data, []);
	const columns = useMemo(()=>myColumns,
        [])
    const { getTableProps , getTableBodyProps , headerGroups , rows , prepareRow }= useTable({ columns, data:userData })
    

    return (
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
								 <th className="pl-14 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider ">Actions</th>
                                </tr>)))}
							
						</thead>
						<tbody {...getTableBodyProps()} >
							
  {rows.map((row) => {
    prepareRow(row);
	
    return (
      <tr {...row.getRowProps()} className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
        {row.cells.map((cell) => {
			switch(cell.value){
				case "accepté": return (<span {...cell.getCellProps()}
				className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-bold uppercase block mt-5 " > {cell.render('Cell')}</span>)
				case "refusé": return (<span {...cell.getCellProps()}
				className="bg-red-500 text-white-600 py-1 px-3 rounded-full text-xs font-bold uppercase ml-1 block mt-5  " > {cell.render('Cell')}</span>)
				case "en cours": return (<span {...cell.getCellProps()}
				className="bg-orange-300 text-orange-600 py-1 px-3 rounded-full text-xs font-bold uppercase  ml-1 block mt-5" > {cell.render('Cell')}</span>)
				
			}
			
          return (
            <td {...cell.getCellProps()} className="  px-5 py-5  border-b border-gray-200 bg-white text-sm">
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
		<td className="px-5 py-5  border-b border-gray-200 bg-white ">
		<div className="flex item-center justify-center">
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 text-purple-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 text-purple-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 text-purple-200 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
		</td>
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
    )
}
export default EmployeeDashboard ;