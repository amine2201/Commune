/* eslint-disable no-mixed-spaces-and-tabs */
import PdfViewerComponent from './PdfViewerComponent';
import Navbar from './Navbar';
import {  useState } from 'react';
import { useParams } from 'react-router-dom';
import documentService from '../Api/services/DocumentService';
import { DocumentStatus,Role } from '../Types/types';
import accept  from '../assets/accept.png';
import cancel  from '../assets/cancel.png';
import DigitalSignature from '../assets/DigitalSignature.jpeg';
import Toast, { showToast } from './Toast';
import Modal from './Modal';

const SignComponent=()=> {
        const idS=useParams().id;
        const id=parseInt(idS?idS:"0");
        const [isSigned, setIsSigned] = useState(false);
        const [buffer, setBuffer] = useState(null);
        const [message,setMessage] = useState<string>("");
        const props={id:id,setIsSigned:setIsSigned,setBuffer:setBuffer};
        const [success,setSuccess] = useState<boolean>(false);
	const handleClickSigner =()=>{
                if(!isSigned){
                        showToast("Veuillez d'abord signer le document", {
                                position: "bottom-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              },false);
                        }
                            
                if(buffer!=null) {
                if(localStorage.getItem('role') == Role.employee){
                        documentService.validateDocument(id,DocumentStatus.approved);
                }
                const blob = new Blob([buffer]);
                const file = new File([blob], "fichier", {type: "application/pdf"});
                documentService.signDocument(id,file).then(()=>{setMessage('Signature confirmée');  setSuccess(true);}).catch((err)=>{
                showToast(err.response.data, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      },false);}
                    
                );
                

        }}
        const handleClickRejeter =()=>{
                if(localStorage.getItem('role') == Role.employee)
                documentService.validateDocument(id,DocumentStatus.rejected).then(()=>{setMessage('rejet confirmé'); setSuccess(true)}).catch((err)=>{
                        showToast(err.response.data, {
                                position: "bottom-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              },false);
                })
                else documentService.rejectDocument(id).then(()=>{setMessage('rejet confirmé'); setSuccess(true)}).catch((err)=>{
                        showToast(err.response.data, {
                                position: "bottom-center",
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              },false);
                })
        }
        return (
        <>
        <Navbar isAuthenticated={true}/>	
        <br/>
        
        <div className='h-[110vh] w-[75vw] flex flex-col items-center justify-center mx-auto  '>
        <div className='flex flex-row justify-center items-center bg-white/60 rounded-t-xl p-1 px-3 shadow-lg'>
        <h1 className='text-2xl font-bold text-black/60 uppercase tracking-wide mr-4 ml-2 '>Signature digitale</h1>
        <img className="mix-blend-multiply h-[5rem] w-[5rem] " src={DigitalSignature}/></div>
	<PdfViewerComponent {...props} />
        <div style={{ display: 'flex' }}>
         
         {
        localStorage.getItem('role') === Role.employee ? (
                <div className="flex flex-row  items-center justify-center">
                <button
                  onClick={handleClickSigner}
                  className="p-2 flex flex-row items-center justify-center rounded-lg bg-neutral-100 shadow-lg cursor-pointer hover:bg-green-200 mt-5 transition-transform duration-250 ease-out transform hover:scale-105 mb-3 border-gray-600/30 border-[1px] mr-5"
                >
                  <h1 className="font-bold text-black/60 uppercase tracking-wider text-md px-3">
                    Confirmer la signature
                  </h1>
                  <img src={accept} className="h-8 w-8 mix-blend-multiply" />
                </button>
                <button
                 onClick={handleClickRejeter}
                 className="p-1 py-[0.35rem] px-5 flex flex-row items-center justify-center rounded-lg bg-neutral-100 shadow-lg cursor-pointer hover:bg-red-300 mt-5 transition-transform duration-250 ease-out transform hover:scale-105 mb-3 border-gray-600/30 border-[1px]">
               <h1 className="font-bold text-black/60 uppercase tracking-wider text-md px-3 py-2">
                       Rejeter la signature
               </h1>
               <img  src={cancel} className="  h-9 w-9 mix-blend-multiply ml-5 mr-[-0.4cm]" />
         </button>
                </div>
  ):
  (
        <div className="flex flex-row items-center justify-center">
         <button
           onClick={handleClickSigner}
           className="p-2 flex flex-row items-center justify-center rounded-lg bg-neutral-100 shadow-lg cursor-pointer hover:bg-green-200 mt-5 transition-transform duration-250 ease-out transform hover:scale-105 mb-3 border-gray-600/30 border-[1px] mr-5"
         >
           <h1 className="font-bold text-black/60 uppercase tracking-wider text-md px-3">
             Confirmer la signature
           </h1>
           <img src={accept} className="h-8 w-8 mix-blend-multiply" />
         </button>
                         <button
                 onClick={handleClickRejeter}
                 className="p-1 py-[0.35rem] px-5 flex flex-row items-center justify-center rounded-lg bg-neutral-100 shadow-lg cursor-pointer hover:bg-red-300 mt-5 transition-transform duration-250 ease-out transform hover:scale-105 mb-3 border-gray-600/30 border-[1px]">
               <h1 className="font-bold text-black/60 uppercase tracking-wider text-md px-3 py-2">
                       Rejeter la signature
               </h1>
               <img  src={cancel} className="  h-9 w-9 mix-blend-multiply ml-5 mr-[-0.4cm]" />
         </button>

                </div>
  )}

       
   
        </div>
	</div>
        <Toast position="bottom-center" autoClose={3000} theme="light" />    
        {success &&
               <Modal message={message} bouttonText="Vérifier son statut" hrefURL='/statut'/> }
        </>
		
	);
}
export default SignComponent;