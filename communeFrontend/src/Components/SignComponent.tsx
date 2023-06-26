/* eslint-disable no-mixed-spaces-and-tabs */
import PdfViewerComponent from './PdfViewerComponent';
import Navbar from './Navbar';
import {  useState } from 'react';
import { useParams } from 'react-router-dom';
import documentService from '../Api/services/DocumentService';
import { DocumentStatus, userType } from '../Types/types';

const SignComponent=()=> {
        const idS=useParams().id;
        const id=parseInt(idS?idS:"0");
        const [isSigned, setIsSigned] = useState(false);
        const [buffer, setBuffer] = useState(null);
        const props={id:id,setIsSigned:setIsSigned,setBuffer:setBuffer};
	const handleClickSigner =()=>{
                if(buffer!=null) {
                if(localStorage.getItem('role') == userType.employee){
                        documentService.validateDocument(id,DocumentStatus.approved).then((res)=>{
                                console.log(res);
                        })
                }
                const blob = new Blob([buffer]);
                const file = new File([blob], "fichier", {type: "application/pdf"});
                documentService.signDocument(id,file).then((res)=>{
                        console.log(res);
                })
        }}
        const handleClickRejeter =()=>{
                documentService.validateDocument(id,DocumentStatus.rejected).then((res)=>{
                        console.log(res);
                })
        }
        return (
        <>
        <Navbar isAuthenticated={true}/>	
        <br/>
        
        <div className='h-[95vh] w-[75vw] flex flex-col items-center justify-center mx-auto  '>
	<PdfViewerComponent {...props} />
        <div style={{ display: 'flex' }}>
        <button className='text-white cursor-pointer text-lg bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full  px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5 mb-2  ' disabled={!isSigned} onClick={handleClickSigner}>
        Signer</button>
        {
        localStorage.getItem('role') === userType.employee && (
        <button className='text-white cursor-pointer text-lg bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5 mb-2' onClick={handleClickRejeter}>
         Rejeter</button>
)}

        </div>
	</div>
        
       
        </>
		
	);
}
export default SignComponent;