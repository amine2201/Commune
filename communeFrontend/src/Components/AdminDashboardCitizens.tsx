/* eslint-disable prefer-const */
import { useState } from "react";
import { Citoyen } from "../Types/types";
import { Dialog , Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useEffect} from 'react'
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import CitoyenService from "../Api/services/CitoyenService";

const AdminDashBoardCitizens  = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const closeModal = () => {setIsOpen(false); setShowModal(false);}     
    const [data, setData] = useState<Citoyen[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false)
    const [citoyen,setCitoyen] = useState<Citoyen>({
        email : "",
        password : "",
        cin : ""
    });
      const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name ,value } = e.target 
        const newCitoyen = {...citoyen,[name]:value}
        console.log("USER IS GOING TO BE ADDED",newCitoyen)
        setCitoyen(newCitoyen) }
        const onSubmitForm = async(e : React.SyntheticEvent ) => {
            e.preventDefault();
            console.log(citoyen)
           CitoyenService.createCitoyen(citoyen).then(res => setData(res)).catch(err => console.log(err))  
            window.location.reload() 
        } 
useEffect(()=> {
        CitoyenService.getCitoyens()
        .then(res => setData(res))
        .catch(err => console.log(err))
       
},[])
const handleDeleteUser = async (id: number) => {
    try {
      CitoyenService.deleteCitoyen(id);
      const newData = data.filter((user) => user.id !== id);
      setData(newData);
   
    } catch (err) {
      console.log(err);
    }
  };
const handleAdd = () => {
    setShowModal(true);
    setIsOpen(true);
}
    const AddButton = () => 
        <button type="submit"  className="flex items-center mt-[2.5cm] justify-center text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 my-[-2cm]" onClick={handleAdd}>
                                <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Ajouter un citoyen
                            </button>
    
   
    return (
       
           
        <div>
             
             
             <div>
                <div className="flex items-center justify-center ">
                <div>
        
			
		</div>
                    
                      <AddButton/>   
                      
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
                 
				<div className="inline-block min-w-full mb-[2rem] pb-10">
                <h2 className=" text-[1.5rem] font-bold leading-none tracking-tight text-gray-700  dark:text-white p-6 ">Pour les citoyens</h2>
              
					<table className=" ml-5 min-w-[97vw] leading-normal">
                        
            <thead>
                <tr >
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        CIN
                    </th>
                    <th className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider ">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.length == 0 && <Loading/>}
                    {data.map((_citoyen) => (
                        <tr key={_citoyen.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:block">
                                        <img className="w-full h-full rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {_citoyen.id}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {_citoyen.email}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {_citoyen.cin}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
  <div className="flex ">
    <div className="w-6 h-8 mr-2  transform hover:text-red-500 hover:scale-110 text-red-400 cursor-pointer" onClick={() => handleDeleteUser(_citoyen.id?_citoyen.id:0)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </div>
    <Link  to={`/updateCitizen/${_citoyen.id}`} className="w-6 h-8 mr-2 transform hover:text-green-500 hover:scale-110 text-green-400 cursor-pointer" >
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
       {
        showModal &&
        <>
        <div className="fixed inset-0 flex items-center justify-center">
          
        </div>
  
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold leading-6 text-gray-900 p-2 mb-5"
                    >
                       Ajouter un citoyen
                    </Dialog.Title>
                    <div className="mt-2">
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitForm} method='post'>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" value={citoyen.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "onChange={onChangeInput}  placeholder="name@company.com" required/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                        <input type="password" value={citoyen.password} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "onChange={onChangeInput}  placeholder="password" required/>
                    </div>
                    <div>
                        <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre CIN</label>
                        <input type="text" value={citoyen.cin} name="cin" id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="L2490DB1" onChange={onChangeInput} required/>
                    </div>
                    <div className="flex items-center justify-between">
                       
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>
                  
                </form>
                    </div>
  
                    <div className="mt-4">
                    
                    <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={closeModal}>Annuler</button>
                   
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
       }  
         
        </div>
        </div>
        </div>
        </div>
    )

}
export default AdminDashBoardCitizens ;