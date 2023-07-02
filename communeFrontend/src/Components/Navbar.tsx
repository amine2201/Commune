import { Link, useNavigate } from 'react-router-dom'
import logoWizara from '../assets/logoWizara.jpeg'
import profile from '../assets/profile.png'
import Notifications from './Notifications';
import { LogoutUser } from '../Api/Auth/AuthService';
interface HeaderProps {
  isAuthenticated: boolean;
}
const NavbarTrue = () => {
  const navigate = useNavigate()
  const username = localStorage.getItem('user') ;
  const handleLogout = async () => {
    LogoutUser().then(()=>{
      navigate('/')
      window.location.reload();
    });

}


  return (
    <>
      <ul className="font-medium flex flex-col p-6 mt-4  px-10 border border-gray-100 rounded-lg bg-gray-50/60 md:flex-row md:space-x-16 mr-4 py-4 pl-5 md:mt-0 md:border-0 shadow-md ">
          {localStorage.getItem('role') === 'CITOYEN'  ? (
            <>
          <li>
            <Link className="font-light text-lg flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 hover:text-primary-900  focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-900 tracking-wider" to="/statut">Statut</Link>
          </li>
          <li>
            <Link className="flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black font-light text-lg uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 tracking-wider" to="/services">Services</Link>
          </li>
          </>
          ):localStorage.getItem('role') === 'EMPLOYEE'?(
              <Link className=" flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-350 ease-in-out 
              hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 tracking-wider" to="/statut">Statut</Link>
            ):(
            <>
            <li>
            <Link className="flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 tracking-wider " to="/employe">Fonctionnaire</Link>
            </li>
            <li>
            <Link className="flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 tracking-wider " to="/citoyen">citoyen</Link>
          </li>
          </>
          )}
          <li className="flex items-center bg-neutral-200/70 px-4 py-[0.2cm] pb-[0.1cm] rounded-full cursor-default hover:bg-neutral-300 border-black/10 border-[1px] ">
           <img src={profile} className=' flex items-center h-8 w-8 ' alt="Profile" />
          
            <span className=' block ml-2 text-black font-light uppercase leading-normal text-primary mb-[0.1cm] tracking-wider '>
              {
              username  ? username : ''
            }</span>
             </li>
            <li className="mx-[-0.3cm] ml-12 mt-1 ">
              <Notifications/>
            </li>
 
            <li >
            <Link className="flex items-center rounded-lg px-6 pb-2 pt-2.5 text-black  uppercase leading-normal text-primary l-100 transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 tracking-wider font-light text-lg" onClick={handleLogout} to="/">Logout</Link>
              </li>
        </ul>
    </>
  )
}
const NavbarFalse = () => {
  return (
    <>
     <ul className="font-medium flex flex-col p-6 mt-4 px-10 border border-gray-100 rounded-lg bg-gray-50/60 md:flex-row md:space-x-14 md:mt-0 md:border-0  shadow-lg">
          <li>
            <Link className="rounded-lg px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Login">Authentification</Link>
          </li>
          <li>
            <Link className="rounded-lg px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-350 ease-in-out 
            hover:rounded-lg hover:bg-blue-200/25 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Signup">Inscription</Link>
          </li>
        </ul>
    </>
  )
}
const Navbar : React.FC<HeaderProps> =  ({isAuthenticated}) => {
    return (
      <nav className="border-gray-500">
      <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4 ml-5">
        <div className="flex items-center justify-between w-full ">
       
          <Link to="/" className="h-10 w-10  mix-blend-multiply">
          <img src={logoWizara} alt="Logo" />
        </Link>
        <div className="hidden w-full md:block md:w-auto ">
          {isAuthenticated ? <NavbarTrue /> : <NavbarFalse />}
        </div>
        </div>
        </div>
      
    </nav>
  
    

    )

}

export default Navbar