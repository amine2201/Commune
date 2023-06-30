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
      <ul className="font-medium flex flex-col p-6 mt-4  px-10 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-16 mr-4 py-4 pl-5 md:mt-0 md:border-0 md:bg-white ">
          <li>
            <Link className=" flex items-center rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/CitizenDashboard">Status</Link>
          </li>
          <li>
            <Link className="flex items-center rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 " to="/Service">Services</Link>
          </li>
          <li className="flex items-center ">
           <img src={profile} className=' flex items-center h-8 w-8 mt-1 ' alt="Profile" />
          
            <span className=' block ml-2 text-black font-medium uppercase leading-normal text-primary mt-1'>
              {
              username  ? username : ''
            }</span>
            <li className="mx-[-0.3cm] ml-12 mt-1 ">
              <Notifications/>
            </li>
  </li>
            <li >
            <Link className="flex items-center rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" onClick={handleLogout} to="/">Logout</Link>
              </li>
        </ul>
    </>
  )
}
const NavbarFalse = () => {
  return (
    <>
     <ul className="font-medium flex flex-col p-6 mt-4 px-10 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-14 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link className="rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Login">Authentification</Link>
          </li>
          <li>
            <Link className="rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Signup">Inscription</Link>
          </li>
        </ul>
    </>
  )
}
const Navbar : React.FC<HeaderProps> =  ({isAuthenticated}) => {
    return (
    <nav className="border-gray-200">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 mr-1">
    <Link to="/" className="h-10 w-10  mix-blend-multiply mx-[-4cm] ">
      <img src={logoWizara}  alt="Logo" />
      </Link>
    <div className="hidden w-full md:block md:w-auto" >
      {isAuthenticated ? <NavbarTrue/> : <NavbarFalse/>}
    </div>
  </div>
</nav>

    )

}

export default Navbar