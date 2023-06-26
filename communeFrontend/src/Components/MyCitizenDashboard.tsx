import { useEffect, useState } from "react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { document  } from "../Types/types";


const MycitizenDashboard = () => {
    const [documents, setDocuments] = useState<document[]>([]);
    useEffect(()=> {
         axios.get('http://localhost:4001/documents')
            .then(res => setDocuments(res.data))
            .then(data => console.log(data))
            .catch(err => console.log(err))
           
    },[])
    return (
        <div>
             <Navbar isAuthenticated={true}/>
             <h2 className="pb-3 mt-4 text-[2rem] font-bold leading-none tracking-tight text-gray-700  dark:text-white p-6 ">Dashboard du citoyen</h2>
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
            <thead>
                <tr >
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                       Fichiers
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Nombre de signataires
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Signé par
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Type de service
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Status
                    </th>
                    <th className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider ">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {documents.length == 0 && <Loading/>}
                    {documents.map((doc ) => (
                        <tr key={doc.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:block">
                                        <img className="w-full h-full rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {doc.name}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {doc.citoyenIds?.length}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                {doc.citoyenIds?.map((citoyen)=>( <p>{citoyen}</p>))}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                   { doc.type }
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                { doc.status }
                                </p>
                            </td>

                           

                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
  <div className="flex items-center justify-center ">
                        
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
export default MycitizenDashboard;