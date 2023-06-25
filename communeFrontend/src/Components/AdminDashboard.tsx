/* eslint-disable no-mixed-spaces-and-tabs */
import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import AddUserModal from "./AddUserModal";
import { Column, useTable } from "react-table";
import DeleteUserModal from "./DeleteUserModal";


const myColumns = [
    {
        Header : "ID",
        accessor : "id"
    },
    {
        Header: 'Email',
        accessor: 'email'
    } ,
    {
        Header: 'Role',
        accessor: 'role'
    } ,
    {
        Header : "CIN",
        accessor : "cin"
    },
    {
        Header : "mot de passe",
        accessor : "password"
    },
  
  ] as Column[];
  const data = [
    {   
        id: 1,
        email: "admin@gmail.com",
        role: "admin",
        cin: "",

    }
  ]

const AdminDashboard = () => {
    const usersData = useMemo(() => data, []);
	const columns = useMemo(()=>myColumns,
        [])
    const { getTableProps , getTableBodyProps , headerGroups , rows , prepareRow }= useTable({ columns, data:usersData })
    

   
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  
    const AddButton = () => 
                            <button type="submit"  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={handleAdd}>
                                <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Ajouter un fonctionnaire
                            </button>

    const handleAdd = () => {
        setShowModal(true);
       
        
    }
    const handleDelete = () => {
        setShowDeleteModal(true);
    }


  

    return (
        <div>
            <Navbar isAuthenticated={true}/>
           
            
            <div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
        <h2 className="mb-4 text-[2rem] font-bold leading-none tracking-tight text-gray-700  dark:text-white">Admin Dashboard</h2>
			
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
            <AddButton />
            {showModal && <AddUserModal/> }
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
                                        <div className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 text-red-400 cursor-pointer" onClick={handleDelete}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            {showDeleteModal && <DeleteUserModal/> }
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

            
        </div>
    )
}   



export default AdminDashboard;

