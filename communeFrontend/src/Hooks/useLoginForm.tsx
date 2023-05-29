import { ChangeEvent, SyntheticEvent, useState } from "react";
import { userType } from "../Types/types";
import { LoginUser } from "../Api/Auth/Auth";
import { useMutation } from "@tanstack/react-query";
import  { useNavigate } from 'react-router-dom';

const useLoginForm = (userState : userType ) => {
    const navigate = useNavigate();
    const mutation = useMutation(LoginUser , {
        onSuccess: () => { navigate('/Service')}
    })
    const [user,setUser] = useState(userState);

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name ,value } = e.target 
    setUser({...user,[name]:value}) }  

    const onSubmitForm = async (e : SyntheticEvent) => {
    e.preventDefault()
    await mutation.mutateAsync({ email: user.email, password: user.password });
 }
    return {
        user,
        onChangeInput,
        onSubmitForm
    }
}

export default useLoginForm