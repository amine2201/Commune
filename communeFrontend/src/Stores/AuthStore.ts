import { persist } from "zustand/middleware";
import { userType } from "../Types/types";
import { LoginUser, SignupUser } from "../Api/Auth/Auth";
import { create } from "zustand";

type State = {
    user: userType | null;
    token : string | null;
    isLoaded : boolean;
    isLoggedIn : boolean;
   
}
type Actions = {
    signup : (userData : userType) => Promise<void>;
    login : (userData : userType) => Promise<void>;
    logout : () => void;
}

export const useAuthStore = create<State & Actions>(persist(
    
)