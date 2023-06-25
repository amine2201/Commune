/* eslint-disable no-mixed-spaces-and-tabs */
import PdfViewerComponent from './PdfViewerComponent';
import Navbar from './Navbar';
import { useState } from 'react';
const SignComponent=()=> {
        const [isSigned, setIsSigned] = useState(false);
        const [buffer, setBuffer] = useState(null);
        const props={document:"document.pdf",setIsSigned:setIsSigned,setBuffer:setBuffer};
	const handleClick =()=>{if(buffer!=null) console.log(buffer);}
        return (
        <>
        <Navbar isAuthenticated={true}/>	
        <br/>
        
        <div className='h-[95vh] w-[75vw] flex flex-col items-center justify-center mx-auto  '>
        <h1 className='mb-4 text-xl font-bold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl dark:text-white'>DOCUMENT</h1>
	<PdfViewerComponent {...props} />
        <button className='text-white cursor-pointer text-lg bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full  px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5 mb-2  ' disabled={!isSigned} onClick={handleClick}>Envoyer</button>
	</div>
        
       
        </>
		
	);
}
export default SignComponent;