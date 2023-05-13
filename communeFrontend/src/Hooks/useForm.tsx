import { ChangeEvent, SyntheticEvent, useState } from "react";
import { userType } from "../Types/types";
const useForm = (userState : userType ) => {

    const [user,setUser] = useState(userState);

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name ,value } = e.target 
    setUser({...user,[name]:value}) }  

    const onSubmitForm = (e : SyntheticEvent) => {
    e.preventDefault()
    console.log(' Email : ', user.email , ' Password : ' , user.password)
 }
    return {
        user,
        onChangeInput,
        onSubmitForm
    }
}

export default useForm