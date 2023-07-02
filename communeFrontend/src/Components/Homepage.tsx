import Navbar from "./Navbar";
import homepage from '../assets/homepage.jpg'
import subjectToDocument from '../assets/subjectToDocument.jpeg'

 const Homepage = () => {
  const isUserLoggedIn = localStorage.getItem('user') ? true : false;
  return (
    <>
    
    <Navbar isAuthenticated={isUserLoggedIn}/>
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-[3.5rem]   font-extrabold pt-[10rem] text-black/75 ">Services de légalisation et signature de documents </h1>
  <p className="font-extrabold text-gray-700 mt-8 pl-7 tracking-wider">Bienvenue sur notre site dédié à la légalisation et à la signature de documents.<br/> Nous vous offrons un service fiable et sécurisé pour certifier la validité de vos documents importants. <br/>Que ce soit pour des contrats ou des copies, notre équipe expérimentée est là pour vous accompagner. </p>
    </div>
    <img className="opacity-60 h-[101vh] w-full relative bottom-[29rem] z-[-5] " src={subjectToDocument}/>
 

   
    </>
  );
}
export default Homepage;