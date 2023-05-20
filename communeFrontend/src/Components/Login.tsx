import logoWizara from '../assets/logoWizara.jpeg'
import '../App.css'
import {  Link } from "react-router-dom";
import useForm from '../Hooks/useForm';

export default function Login(){
    const {user , onChangeInput , onSubmitForm } = useForm({
      email:'',
      password:''
    })
    const {email , password} = user ;

    const handleInputFocus = (event: React.FocusEvent<HTMLInputElement> )=> {

      const regex = /^([a-z-0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/; 
      const isValid = regex.test(event.target.value);
      if (!isValid) {
        event.target.classList.add( 'ring-red-500');
        return(<><h1>Field fromat is wrong</h1></>)
      } else {
        event.target.classList.remove( 'ring-red-500'); 
      }
    };
    
return (
        <>
     <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <img className="w-12 h-12 block ml-auto mr-auto"  src={logoWizara} alt="logo"/>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Connectez-vous à votre compte
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitForm}>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                          <input type="email" value={email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "onChange={onChangeInput} onFocus={handleInputFocus} placeholder="name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" value={password} name="password" id="password" onChange={onChangeInput} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                      </div>
                      <div className="flex items-center justify-between">
                         
                      </div>
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">S'Authentifier</button>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-400">
                          Vous n'avez pas un compte ? <Link to="/Signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Inscription</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
        </>
      )
    }