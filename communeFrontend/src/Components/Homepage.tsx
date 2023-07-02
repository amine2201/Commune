import Navbar from "./Navbar";
import subjectToDocument from '../assets/subjectToDocument.jpeg'

 const Homepage = () => {
  const isUserLoggedIn = localStorage.getItem('user') ? true : false;
  return (
    <>
    
    <Navbar isAuthenticated={isUserLoggedIn}/>
    <div className="flex flex-col items-center justify-center">
    <h1 className="text-[3.5rem]   font-extrabold pt-[12.5rem] text-gray-600 ">Services de légalisation et signature de documents </h1>
    </div>
    <img className="opacity-[0.80] h-[116vh] pt-10 w-full relative bottom-[29rem] z-[-10] " src={subjectToDocument}/>
 

   
    </>
  );
}
export default Homepage;