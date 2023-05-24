/* eslint-disable no-mixed-spaces-and-tabs */
import Navbar from "./Navbar";
import {Column , useTable} from 'react-table';
import { useMemo } from "react";

const Columns = [ {
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
},]


const CitizenDashboard = ()=>{
    const userData = useMemo(() => data, []);
	const columns = useMemo(()=>Columns,
        [])
    const { getTableProps , getTableBodyProps , headerGroups , rows , prepareRow }= useTable({ columns, data:userData })
  
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



