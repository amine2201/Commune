import Navbar from "./Navbar";
import homepage from '../assets/homepage.jpg'


 const Homepage = () => {
  const isUserLoggedIn = localStorage.getItem('user') ? true : false;
  return (
    <>
    <Navbar isAuthenticated={isUserLoggedIn}/>
    <div>
  <h1 className="text-[3.5rem] pl-5  font-extrabold pt-[10rem] text-black">Services de légalisation  <br/> et signature de documents </h1>
  <p className="font-extrabold text-gray-500 mt-10 pl-7 ">Bienvenue sur notre site dédié à la légalisation et à la signature de documents.<br/> Nous vous offrons un service fiable et sécurisé pour certifier la validité de vos documents importants. <br/>Que ce soit pour des contrats ou des copies, notre équipe expérimentée est là pour vous accompagner. </p>
</div>
<img src={homepage} className="relative rounded-full opacity-[0.95] left-[55rem] bottom-[26rem] h-[75vh]"/>
   
    </>
  );
}
export default Homepage;