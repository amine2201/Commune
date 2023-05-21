import Modal from "./Modal"
import Navbar from "./Navbar"
import contract from '../assets/contract.jpg' 
import add from '../assets/add.png' 
import { ChangeEvent, useState , useRef } from "react"


interface InputComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Service =  () => {
    const [file,setFile] = useState<File>()
    const [clicked,setClicked] = useState<boolean>(false)
    const [checked,setChecked] = useState<boolean>(false)
    const [inputComponent , setInputComponent] = useState<JSX.Element[]>([])
    const [inputClicked , setInputClicked] = useState<number>(1)
    const AddInputComponent = () => {
        setInputComponent([...inputComponent, <CinInput key={inputComponent.length}/>])
        console.log(inputComponent)
        setInputClicked(inputClicked => inputClicked + 1);

    }
 
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
   
    
    
    const CinInput = () => {
      const [inputValue, setInputValue] = useState('');
    
      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        console.log(inputRef.current?.value)
        
      };
      const inputRef = useRef<HTMLInputElement>(null);
        return (
            <div className="relative mb-3" data-te-input-wrapper-init>
            <input
              ref={inputRef}
              placeholder="CIN"
              type="text"
              value={inputRef.current?.value }
              className="peer block min-h-[auto] w-full rounded border-0 bg-primary-200 px-3 py-[0.32rem] leading-[1.6] outline-none "
              id="CIN"
             onChange={handleInputChange}
              />
            <label
            placeholder="CIN"
              
              htmlFor="CIN"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
              >
            </label>
          </div>
        
        )}
    return (
        <>
        <Navbar isAuthenticated={true}/>
       
        <section style={{ height: `${80+inputClicked*5}vh`}} className="flex flex-col items-center justify-center  mx-auto md:h-[80vh] px-10  w-[75vh]  bg-white rounded-md ">
            <img className="h-50 w-40 mb-[1.5rem] " src={contract} alt="preview"  />
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez votre type de service</h2>
            <div>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className=" text-sm font-medium  text-gray-900 pr-5 pl-2">Legalizaition</label>
            <input id="default-radio-1" type="radio" value="" name="default-radio" onClick={()=>setChecked(!checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600  focus:ring-2 "/>
            <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium  text-gray-900 dark:text-gray-300">Certification</label>

            </div>
            <h2 className="font-bold py-5 text-center text-black text-xl">Choisissez le nombre de signataires</h2>
            <CinInput />
             <img onClick={AddInputComponent} src={add} className="h-7 w-7 opacity-70 hover:opacity-50 relative block left-[4cm] bottom-11" />
             {inputComponent}
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
             <label  htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"  >Select Document
             <input type="file" id="file" name="file" disabled={!(checked)}  onChange={handleChange} className=" hidden"  accept=".pdf" />
             </label> 
              </>}
           
        
        </section>
        
        </>
    )
}

export default Service