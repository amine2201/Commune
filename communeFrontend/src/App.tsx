
import './App.css'
import Login from './Components/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup';
import Service from './Components/Service';
import Homepage from './Components/Homepage';
import EmployeeDashboard from './Components/EmployeeDashboard';
import CitizenDashboard from './Components/CitizenDashboard';
import ErrorPage from './Components/ErrorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {  AuthContextProvider } from './Api/Auth/AuthContext';
import SignComponent from './Components/SignComponent';
const queryClient = new QueryClient();
function App() {
  const isUserLoggedIn = localStorage.getItem('user') ? true : false
  
return (
  
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
    <BrowserRouter>
    <Routes>
      {
        isUserLoggedIn ?
        <>
        <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Employeedashboard" element={<EmployeeDashboard />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/signer" element={<SignComponent />} />
       </>
       :
        <>
                <Route path="/" element={<Homepage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/signer" element={<SignComponent />} />
        </>

      }
               
              
              
            </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  </QueryClientProvider>
  


  )
}

export default App
