import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { Userdata } from "../Types/types";

const OtherTable = () => {  
    const [data, setData] = useState<Userdata[]>([]);
    const [user,setUser] = useState<Userdata>({
        id: 0,
        email:'',
        cin:'',
          
      });
      const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const {name ,value } = e.target 
        const newUser = {...user,[name]:value}
        setUser(newUser) }
        const onSubmitForm = (e : React.SyntheticEvent ) => {
            e.preventDefault();
            const newUser = {
                id: data.length +1 ,
                email:user.email,
                cin:user.cin,
            }
            axios.post('http://localhost:4000/users',newUser).then(res => setData(res.data)).catch(err => console.log(err))   
        } 
useEffect(()=> {
    axios.get('http://localhost:4000/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
},[])
const handleDelete = (id:number | undefined) => {
    const newData = data.filter((user) => user.id !== id);
    setData(newData);
}
    return (

        <div>
        <table>
        <thead>
                <tr >
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        CIN
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                    {data.map((_user , index) => (
                        <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10 hidden sm:block">
                                        <img className="w-full h-full rounded-full" src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {_user.id}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {_user.email}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {_user.cin}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                         
                                <button type="submit" className=" px-4 py-2 ml-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red cursor-pointer" onClick={()=>handleDelete(_user.id)} >
                                    Delete
                                </button>
                              
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                         
                         <button type="submit"  className=" px-4 py-2 ml-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-red cursor-pointer"  >
                             Edit
                         </button>
                     </td>
                        </tr>
                    ))}
                </tbody>

        </table>
        <form className="space-y-4 md:space-y-6"  onSubmit={onSubmitForm} >
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                          <input type="email" value={user.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "onChange={onChangeInput}  placeholder="name@company.com" required/>
                      </div>
                      <div>
                          <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre CIN</label>
                          <input type="text" value={user.cin} name="cin" id="cin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="L2490DB1" onChange={onChangeInput} required/>
                      </div>
                      <div className="flex items-center justify-between">
                         
                      </div>
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Ajouter</button>
                    
                  </form>
        </div>
    )
    }
export default OtherTable