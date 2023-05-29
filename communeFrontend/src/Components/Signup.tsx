import logoWizara from '../assets/logoWizara.jpeg'
import '../App.css'
import { Link } from 'react-router-dom';
import { userType } from "../Types/types";
import { useMutation } from '@tanstack/react-query';
import { SignupUser } from '../Api/Auth/Auth';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';


export default function Signup(){
  
    const { mutateAsync , data } = useMutation(SignupUser)
    const [user,setUser] = useState<userType>({
        email:'',
        password:'',
        cin:''
    });
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name ,value } = e.target 
    setUser({...user,[name]:value}) }  

    const onSubmitForm = async (e : SyntheticEvent) => {
    e.preventDefault()
    try {
        await mutateAsync({ email: user.email, password: user.password, cin: user.cin });
      
        } catch (error) {
        console.log(error);
      }
    }
  const {isLoading , isError } = useMutation(SignupUser)
  useEffect(() =>console.log("MY DATA : ",data), [data])
 
  if(isLoading) return <h1 className='font-bold text-white text-4xl'>Loading ...</h1>
  if(isError) return <h1 className='font-bold text-white text-4xl'>Error</h1>

 
return (
        <>
     <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img className="w-12 h-12 block ml-auto mr-auto "  src={logoWizara} alt="logo"/>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Créez votre compte
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" method="post" onSubmit={onSubmitForm}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                          <input type="email" value={user.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "  placeholder="name@company.com" onChange={onChangeInput} required/>
                      </div>
                      <div>
                          <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre CIN</label>
                          <input type="text" value={user.cin} name="cin" id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="L2490DB1" onChange={onChangeInput} required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                          <input type="password" name="password" value={user.password} id="password" placeholder="••••••••" onChange={onChangeInput} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      </div>
                      <div className="flex items-center justify-between">
                         
                      </div>
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"  onClick={()=>console.log(user)}>S'Inscrire</button>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-400">
                          Vous avez dèja un compte ? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Se connecter</Link>
                      </p>
                      
                   
                  </form>
              </div>
          </div>
      </div>
    </section>
        </>
      )
    }