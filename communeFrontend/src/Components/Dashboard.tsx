import { useEffect, useState } from "react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {  Role, document  } from "../Types/types";
import documentService from "../Api/services/DocumentService";
import HeaderTitle from "./HeaderTitle";


const Dashboard = () => {
    const title=localStorage.getItem('role')===Role.citoyen?'Dashboard Citoyen':'Dashboard Employé';
    const [documents, setDocuments] = useState<document[]>([]);
    const statusMapping: Record<string, string> = {
        "APPROVED": "approuvé",
        "REJECTED": "rejeté",
        "PENDING": "en cours",
    };
    const getStatusDisplay = (status: string) => {
    switch(status) {
        case "approuvé": 
            return (
                <div className="flex">
                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs font-bold uppercase block ">
                        {status}
                    </span>
                </div>
            );
        case "rejeté": 
            return (
                <div className="flex">
                    <span className="bg-red-500 text-white py-1 px-3 rounded-full text-xs font-bold uppercase  block">
                        {status}
                    </span>
                </div>
            );
        case "en cours": 
            return (
                <div className="flex">
                    <span className="bg-orange-300 text-orange-600 py-1 px-3 rounded-full text-xs font-bold uppercase block">
                        {status}
                    </span>
                </div>
            );
        default: 
            return 'Status not available';
    }
}

    
    useEffect(()=> {
            documentService.getDocuments()
            .then(res => setDocuments(res))
            .catch(err => console.log(err))
           
    },[])
    return (
        <div>
             <Navbar isAuthenticated={true}/>
             <HeaderTitle name={title}/>
             <div>
                <div className="flex items-center justify-center">
                <div>
        
			
		</div>
                      <div className="absolute mb-10 ml-[35cm]">
               
                      </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
				<div className="inline-block min-w-full shadow rounded-lg ">
					<table className="min-w-full leading-normal ">
            <thead >
                <tr >
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                       Fichiers
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Nombre de signataires
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Signé par
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Type de service
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider ml-1">
                        Status
                    </th>
                    <th className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-bold text-gray-600 uppercase tracking-wider ">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                    {!documents && <Loading/>}
                    {documents && documents.map((doc ) => (
                        <tr key={doc.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {doc.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {doc.citoyenIds?.length}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {doc.signeesIds?.length}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                                <p className="text-gray-900 whitespace-no-wrap">
                                   { doc.documentType }
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {doc.status ? getStatusDisplay(statusMapping[doc.status]) : 'Status not available'}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold">
                             <div className="flex ">
                             <Link  to={`/signer/${doc.id}`} className="w-6 h-8 mr-2 transform hover:text-green-500 hover:scale-110 text-green-400 cursor-pointer" >
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                               </svg>
                             </Link>
                             </div>
</td>
                        </tr>
                    ))}
                </tbody>
      


        </table>
       
        
        </div>
        </div>
        </div>
        </div>
      
    )
    
}
export default Dashboard;