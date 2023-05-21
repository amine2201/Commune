import Modal from "./Modal"
import Navbar from "./Navbar"
import contract from '../assets/contract.jpg'  
import { ChangeEvent, useState , useRef } from "react"
const Service =  () => {
    const [file,setFile] = useState<File>()
    const [clicked,setClicked] = useState<boolean>(false)
    const [checked,setChecked] = useState<boolean>(false)
    const [inputComponent , setInputComponent] = useState<JSX.Element[]>([])
    const AddInputComponent = () => {
        setInputComponent([...inputComponent, <CinInput key={inputComponent.length}/>])
        console.log(inputComponent)
    }
    const Cinref = useRef<HTMLInputElement>(null)
    const Labelref = useRef<HTMLLabelElement>(null)
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
    const handleInputClick = () => {
        if(Cinref.current)  Labelref.current?.focus()
    }
    const CinInput =  () => {
        return (
            <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              onClick={handleInputClick}
              ref={Cinref}
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-primary-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none text-neutral-600 placeholder:text-neutral-600 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="CIN"
              />
            <label
            
                ref={Labelref}
              htmlFor="CIN"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >CIN
            </label>
          </div>
        
        )}
    return (
        <>
        <Navbar isAuthenticated={true}/>

        <section className="flex flex-col items-center justify-center mt-10 mx-auto md:h-[76vh] px-10  w-[75vh]  bg-white rounded-md ">
            <img className="h-50 w-40 mb-[1.5rem] " src={contract} alt="preview"  />
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre type de service</h2>
            <div>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">Legalizaition</label>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300">Certification</label>

            </div>
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez le nombre de signataires</h2>
            <CinInput/>
            {/* <button className="p-5 bg-black justify-end"
             onClick={AddInputComponent} type="submit">add</button>
             {inputComponent}
    */}
            <div>
            
            
            
            
            </div>

            {file ?
             <>
             <div className="p-10 border-solid border-green-800 rounded-sm">
             <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded " type="submit"  onClick={handleSubmission}>Upload</button>
             {clicked &&
               <Modal/> }
             </div>
            </>
             :
             <>

             <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre fichier</h2>
             <label htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" >Select Document
             <input type="file" id="file" name="file" disabled={(checked)} onChange={handleChange} className=" hidden"  accept=".pdf"/>
             </label> 
              </>}
           
        
        </section>
        </>
    )
}

export default Service