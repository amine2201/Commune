import Modal from "./Modal"
import Navbar from "./Navbar"
import contract from '../assets/contract.jpg'  
import { ChangeEvent, useState } from "react"
const Service =  () => {
    const [file,setFile] = useState<File>()
    const [clicked,setClicked] = useState<boolean>(false)
    const [checked,setChecked] = useState<boolean>(false)
    const [checked2,setChecked2] = useState<boolean>(false)
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
         if (e.target.files) {
      setFile(e.target.files[0]);
    }
    }
    const handleSubmission = ()=>{ 
        if (!file) return ;
        fetch('https://httpbin.org/post', {
        method: 'POST',
        body: file,
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`, 
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
        setClicked(true)
    }
    return (
        <>
        <Navbar/>

        <section className="flex flex-col items-center justify-center mt-10 mx-auto md:h-[75vh] px-10  w-[80vh]  bg-white rounded-md ">
            <img className="h-50 w-40 " src={contract} alt="preview"  />
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre type de service</h2>
            <div>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">Legalizaition</label>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300">Certification</label>

            </div>
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez le nombre de signataires</h2>
            <div>
            <input id="default-radio-2" type="radio" value="" name="default-radio2" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-2" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">1</label>
            <input id="default-radio-2" type="radio" value="" name="default-radio2" onClick={()=>setChecked2(!checked2)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300 mr-5">2</label>
            <input id="default-radio-2" type="radio" value="" name="default-radio2" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-2" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">3</label>
            
            
            
            </div>

            {file ?
             <>
             <div className="p-10 border-solid border-green-800 rounded-sm">
             <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " type="submit"  onClick={handleSubmission}>Upload</button>
             {clicked &&
               <Modal/> }
             </div>
            </>
             :<>

             <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre fichier</h2>
             <label htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" >Select Document
             <input type="file" id="file" name="file" disabled={(checked || checked2)} onChange={handleChange} className=" hidden"  accept=".pdf"/>
             </label> 
              </>}
           
        
        </section>
        </>
    )
}

export default Service