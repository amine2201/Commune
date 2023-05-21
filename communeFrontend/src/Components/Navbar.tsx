import { Link } from 'react-router-dom'
import logoWizara from '../assets/logoWizara.jpeg'

interface HeaderProps {
  isAuthenticated: boolean;
}
const NavbarTrue = () => {
  return (
    <>
      <ul className="font-medium flex flex-col p-6 mt-4 px-10 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-14 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link className="rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Status">Status</Link>
          </li>
          <li>
            <Link className="rounded px-6 pb-2 pt-2.5 text-black font-medium uppercase leading-normal text-primary transition duration-250 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700" to="/Service">Services</Link>
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
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <img src={logoWizara} className="h-10 w-10 mr-[2rem] mix-blend-multiply " alt="Logo" />
    <div className="hidden w-full md:block md:w-auto" >
      {isAuthenticated ? <NavbarTrue/> : <NavbarFalse/>}
    </div>
  </div>
</nav>

    )

}

export default Navbar