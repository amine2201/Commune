
import { Dialog , Transition } from '@headlessui/react'
import { ChangeEvent, Fragment, useState } from 'react'
import { User } from '../Types/types'

const AddUserModal =()=>{ 
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const closeModal = () => { setIsOpen(false) ;  window.location.reload();}
    const [user,setUser] = useState<User>({
        email:'',
        password:''
    });   
    const onSubmitForm = async (e : React.SyntheticEvent) => {
        e.preventDefault()

    }  
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name ,value } = e.target 
        setUser({...user,[name]:value}) }  
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
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                          <input type="password" value={user.password} name="password" id="password" onChange={onChangeInput} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
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