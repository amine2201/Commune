/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Modal from "./Modal"
import Navbar from "./Navbar"
import contract from '../assets/contract.jpg' 
import add from '../assets/add.png' 
import { ChangeEvent, useState  } from "react"
import cancel2 from '../assets/cancel2.jpg'
import { DocumentType, UploadData } from "../Types/types"
import { api } from "../Api/Auth/AuthService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile} from "@fortawesome/free-solid-svg-icons"
import Toast, { showToast } from "./Toast"


const Service =  () => {
   
   const [upload , setUpload] = useState<UploadData>({
        CINs : [],
   })
    const [documentType, setDocumentType] = useState<DocumentType>();
    const [success,setSuccess] = useState<boolean>(false);
    const [file,setFile] = useState<File >();
    const [checked,setChecked] = useState<boolean>(false)
    const [val, setVal] = useState<string[]>([]);
    const [buttonClicked, setButtonClicked] = useState<number>(0);
  
   

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
       if(e.target.files) {
      setFile(e.target.files[0]);
 
    }
    setUpload((prev) => ({...prev, _file : e.target.files![0]}))
    }
    const handleSubmission = async () => {
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("DocumentType", upload.documentType!);
        formData.append("cins", upload.CINs.toString());
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
        await api.post('/documents', 
          formData).then(()=>setSuccess(true)).catch( (err)=>{                 
            showToast(err.response.data, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          },false);});
        }
     
     
      const handleAdd = () => {
        const updatedVal = [...val, ""];
        setVal(updatedVal);
        setButtonClicked(buttonClicked + 1); }

      const handleChange2 = (onChangeValue: React.ChangeEvent<HTMLInputElement>, i: number) => {
        const updatedValues = [...val];
        updatedValues[i] = onChangeValue.target.value;
        setVal(updatedValues);
        setUpload((prev) => ({...prev, CINs : updatedValues}))
      
      };
    
      const handleDelete = (i: number) => {
        const updatedVal = [...val];
        updatedVal.splice(i, 1);
        setVal(updatedVal);
      };
      const handleRadioButtonChange = (e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.value === "CERTIFICATION"){
          setChecked(true)
          setUpload((prev) => ({...prev, documentType : DocumentType.certification}))
          setDocumentType(DocumentType.certification);
        }
        else {
          setChecked(true)
          setUpload((prev) => ({...prev, documentType : DocumentType.legalisation}))
          setDocumentType(DocumentType.legalisation);
        }
      }
      const handleDeleteFile = () => {
        setFile(undefined)
        setUpload((prev) => ({...prev, _file : undefined}))

      }

    return (

        <>
         <Toast position="bottom-center" autoClose={3000} theme="light" />  
        <Navbar isAuthenticated={true}/>
       
        <section style={{ height: `${80+buttonClicked*5}vh`}} className="flex flex-col items-center justify-center  mx-auto md:h-[80vh] px-10  w-[78vh]  bg-white rounded-md mt-4  pb-[1.3cm] bg-opacity-70  drop  shadow-xl  ">
         
        <div className="w-[10rem] h-[10.2rem] mb-[1rem] mt-6 mix-blend-multiply overflow-hidden">
        <img className="w-full h-full" src={contract} alt="preview" />
        </div>
            <h2 className="font-extrabold py-5 text-center text-gray-600 text-md uppercase tracking-wider">Choisissez votre type de service</h2>
            <div>
            <input id="default-radio-1" type="radio" value="LEGALISATION" name="default-radio" onChange={handleRadioButtonChange} className="w-[0.9rem] h-[0.9rem] text-gray-600 bg-gray-300 border-gray-300 focus:ring-gray-500  focus:ring-2 cursor-pointer"/>
            <label htmlFor="default-radio-1" className=" text-sm font-extrabold  text-gray-500/70 pr-5 pl-2 tracking-wider">LEGALISATION</label>
            <input id="default-radio-2" type="radio" value="CERTIFICATION" name="default-radio" onChange={handleRadioButtonChange} className="w-[0.9rem] h-[0.9rem] text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 cursor-pointer"/>
            <label htmlFor="default-radio-2" className="ml-2  text-sm font-extrabold  text-gray-500/70 pr-5  tracking-wider">CERTIFICATION</label>

            </div>
            {documentType === DocumentType.legalisation ? (
  <>
    {/* Your current legalisation UI here */}
    <h2 className="font-extrabold py-5 text-center text-gray-600 text-md uppercase tracking-wider">
      Ajouter les signataires de document
    </h2>
    <img
      onClick={handleAdd}
      src={add}
      className="cursor-pointer h-7 w-7 opacity-70 hover:opacity-50 relative block mb-2"
    />

    {val.map((myCINS, i) => (
      <div key={i} className="flex items-center mb-2">
        <input
          type="text"
          placeholder="CIN"
          value={myCINS}
          onChange={(e) => handleChange2(e, i)}
          className="border border-gray-300 rounded py-2 px-4 ml-10  focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-grow bg-primary-200 text-black font-semibold"
        />

        <img
          onClick={() => handleDelete(i)}
          src={cancel2}
          className="cursor-pointer h-9 w-9 opacity-70 hover:opacity-50 relative block  ml-5 mix-blend-multiply"
        />
      </div>
    ))}
  </>
) : null}


            {file ?
             <>
              <h2 className="font-extrabold py-2 text-center text-gray-600 text-md uppercase tracking-wider">Fichier selectionné 
             <div className="p-2 py-2  bg-gray-300 rounded-full shadow-sm  cursor-pointer mt-5 border-gray-500/25 border-2 hover:bg-gray-300 "> 
             <FontAwesomeIcon className=" px-2" icon={faFile}></FontAwesomeIcon><span> {file.name}</span></div></h2>
              <img onClick={handleDeleteFile} src={cancel2} className="cursor-pointer h-9 w-9 opacity-70 hover:opacity-50 relative left-[9.5rem] bottom-[3rem] mix-blend-multiply"/>
              
             <div className=" border-solid border-green-800 rounded-sm ">
             
             <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " type="submit"  onClick={handleSubmission}>Charger votre fichier</button>
             {success &&
               <Modal message="Votre fichier a été téléchargé avec succès." bouttonText="Vérifier son statut" hrefURL='/statut'/> }
             </div>
            </>
             :
             <>

             <h2 className="font-extrabold py-5 text-center text-gray-600 text-md uppercase tracking-wider">Choisissez votre fichier</h2>
             <label  htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"  >Sélectionner un fichier
             <input type="file" id="file" name="file" disabled={!(checked)}  onChange={handleChange} className=" hidden"  accept=".pdf" />
             </label> 
              </>}
           
        
        </section>  
        </>
    )
}

export default Service