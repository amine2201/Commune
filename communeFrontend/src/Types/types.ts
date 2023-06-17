export type userType = {
   email: string,
    password: string,
    cin?: string,
}

export type IAuthContext = {
    isLoggedIn : boolean ,
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
} 
