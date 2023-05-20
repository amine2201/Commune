import { ChangeEvent, useState } from "react"
import Navbar from "./Navbar";
import Modal from "./Modal";


const UploadFile = ()=>{
    const [file,setFile] = useState<File>()
    const [clicked,setClicked] = useState<boolean>(false)
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
        <div className="flex items-center justify-center h-screen">
            {file ?
             <>
            
             { /*<img className="h-16 w-14 " src={URL.createObjectURL(file)} alt="preview"  /> */}
             <div className="p-10 border-solid border-green-800 rounded-sm">
              <h2 className="font-bold text-3xl">Your file is ready to be uploaded</h2><span className="font-bold">{file.name } </span>
              
             <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded ml-[15rem] mt-[1rem]" type="submit" onClick={handleSubmission}>Upload</button>
             {clicked &&
               <Modal/> }
             </div>
            </>
             :
             <label htmlFor="file" className=" cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded" >Select Document
             <input type="file" id="file" name="file" onChange={handleChange} className=" hidden"  accept=".pdf"/>
             </label> }
           

        </div>
        </>
    )
}


export default UploadFile
