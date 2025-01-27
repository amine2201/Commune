/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Employee } from "../Types/types";
import EmployeeService from "../Api/services/EmployeeService";

const UpdateEmployee = () => {
    const  idS  = useParams().id;
    const id = idS?parseInt(idS):0;
    const navigate = useNavigate();
    const [employee,setEmployee] = useState<Employee>({
        id: id,
        email:'',
        password:'',
        firstName:'',
        lastName:'',
          
      });
    useEffect(()=>{
        EmployeeService.getEmployeeById(id)
        .then(res => setEmployee(res))
        .catch(err => console.log(err))
    } , [])
    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name ,value } = e.target 
        const newEmployee = {...employee,[name]:value}
        setEmployee(newEmployee)}
    const onSubmitForm = async (e : React.SyntheticEvent) => {
        e.preventDefault();
        EmployeeService.updateEmployee(id,employee);
        navigate('/employe')
        setTimeout(() => window.location.reload(), 100);
        
    }
    return (
        <div>
            <Navbar isAuthenticated={true}/>
          <section className=" mt-20 bg-white flex flex-col justify-center align-center mx-auto w-[45vw] rounded-xl">
  <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Mise à jour d'un fonctionnaire </h2>
      <form onSubmit={onSubmitForm}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" value={employee.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "onChange={onChangeInput}  placeholder="name@company.com" required/>
                    </div>
                    <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" value={employee.password} name="password" id="password" onChange={onChangeInput} placeholder="Entrer un mot de passe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                      </div>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Prénom</label>
                        <input type="text" value={employee.firstName} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Entrez un prénom" onChange={onChangeInput} required/>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Nom</label>
                        <input type="text" value={employee.lastName} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Entrez un Nom" onChange={onChangeInput} required/>
                    </div>
              <div className="flex items-center space-x-4 pt-7">
              <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              Mettre à jour
              </button>
              <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>navigate('/employees')}>
                  <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                 Annuler
              </button>
          </div>
             
             
             
          </div>
      </form>
  </div>
</section>
        </div>
    )
}
export default UpdateEmployee ;