import { ChangeEvent, SyntheticEvent, useState } from "react";
import { userType } from "../Types/types";
import { useMutation } from "@tanstack/react-query";
import { SignupUser } from "../Api/Auth/Auth";
const useSignupForm = (userState : userType ) => {
    const { mutateAsync , data } = useMutation(SignupUser)
    const [user,setUser] = useState(userState);
    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name ,value } = e.target 
    setUser({...user,[name]:value}) }  

    const onSubmitForm = async (e : SyntheticEvent) => {
    e.preventDefault()
    try {
        await mutateAsync({ email: user.email, password: user.password, cin: user.cin });
      
        } catch (error) {
        console.log(error);
      }
    }
 
    return {
        user,
        onChangeInput,
        onSubmitForm,
        data
    }
}

export default useSignupForm