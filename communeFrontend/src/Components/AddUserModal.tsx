
import { Dialog , Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { Userdata, userType } from '../Types/types'


const AddUserModal =()=>{ 
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const closeModal = () => { setIsOpen(false) ;  window.location.reload();}
    const [user,setUser] = useState<Userdata>({
      id:0,
      email:'',
      cin:'',
        
    });   
    const onSubmitForm = (e : React.SyntheticEvent) => {
        e.preventDefault();
        closeModal();
    }  
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name ,value } = e.target 
        setUser({...user,[name]:value})
       
      }  
      useEffect(() => {
        console.log(user)
      },[user])
    return (
        <>
          <div className="fixed inset-0 flex items-center justify-center">
            
          </div>
    
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold leading-6 text-gray-900 p-2 mb-5"
                      >
                         Ajouter un fonctionnaire
                      </Dialog.Title>
                      <div className="mt-2">
                      <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitForm} method='post'>
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
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Ajouter</button>
                    
                  </form>
                      </div>
    
                      <div className="mt-4">
                      
                      <button type="submit" className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={closeModal}>Annuler</button>
                     
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
    }
export default AddUserModal ; 