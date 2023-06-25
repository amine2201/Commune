/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Modal from "./Modal"
import Navbar from "./Navbar"
import contract from '../assets/contract.jpg' 
import add from '../assets/add.png' 
import { ChangeEvent, useEffect, useState  } from "react"
import cancel2 from '../assets/cancel2.jpg'
import { documentType, uploadData } from "../Types/types"
import { api } from "../Api/Auth/AuthService"


const Service =  () => {
   
   const [upload , setUpload] = useState<uploadData>({
        CINs : [],
   })
    const [file,setFile] = useState<File >()
    const [clicked,setClicked] = useState<boolean>(false)
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
        setClicked(true);
        const formData = new FormData();
        formData.append("file", file!);
        formData.append("DocumentType", upload.documentType!);
        formData.append("cins", upload.CINs.toString());

        await api.post('/upload', 
          formData); }
     
     
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
          setUpload((prev) => ({...prev, documentType : documentType.certification}))
          
        }
        else {
          setChecked(true)
          setUpload((prev) => ({...prev, documentType : documentType.legalisation}))
    
        }
      }
      useEffect(() => {
       console.log("UPLOAD DATA : ",upload)

      }, [upload])

      const handleDeleteFile = () => {
        setFile(undefined)
        setUpload((prev) => ({...prev, _file : undefined}))

      }

    return (

        <>
        <Navbar isAuthenticated={true}/>
       
        <section style={{ height: `${80+buttonClicked*6}vh`}} className="flex flex-col items-center justify-center  mx-auto md:h-[80vh] px-10  w-[75vh]  bg-white rounded-md ">
            <img className="h-55 w-40 mb-[1.5rem] overflow-hidden " src={contract} alt="preview"  />
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre type de service</h2>
            <div>
            <input id="default-radio-1" type="radio" value="Legalization" name="default-radio" onChange={handleRadioButtonChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">Legalizaition</label>
            <input id="default-radio-1" type="radio" value="Certification" name="default-radio" onChange={handleRadioButtonChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300">Certification</label>

            </div>
            <h2 className="font-bold py-5 text-center text-black text-xl">Ajouter les signataires de document</h2>
            <img onClick={handleAdd} src={add} className="cursor-pointer h-7 w-7 opacity-70 hover:opacity-50 relative block mb-2" />
           
          {val.map((myCINS, i) => (
            <div key={i} className="flex items-center mb-2">
                
              <input
                type="text"
                placeholder="CIN"
                value={myCINS}
                onChange={(e) => handleChange2(e, i)}
                className="border border-gray-300 rounded py-2 px-4 ml-10  focus:outline-none focus:ring-blue-500 focus:border-blue-500 flex-grow bg-primary-200 text-black font-semibold"
              />
              
              <img onClick={() => handleDelete(i)} src={cancel2} className="cursor-pointer h-9 w-9 opacity-70 hover:opacity-50 relative block  ml-5"/>
            
            </div>
          ))}

            {file ?
             <>
              <h2 className="font-bold py-5 text-center text-black text-xl">Fichier selectionné : {file.name}</h2>
              <img onClick={handleDeleteFile} src={cancel2} className="cursor-pointer h-9 w-9 opacity-70 hover:opacity-50 relative block mb-3  "/>
             <div className=" border-solid border-green-800 rounded-sm">
             
             <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " type="submit"  onClick={handleSubmission}>Upload</button>
             {clicked &&
               <Modal/> }
             </div>
            </>
             :
             <>

             <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre fichier</h2>
             <label  htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"  >Select Document
             <input type="file" id="file" name="file" disabled={!(checked)}  onChange={handleChange} className=" hidden"  accept=".pdf" />
             </label> 
              </>}
           
        
        </section>
        
        </>
    )
}

export default Service