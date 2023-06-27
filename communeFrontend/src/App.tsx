
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
import CitizenDashboard from './Components/CitizenDashboard';
import ErrorPage from './Components/ErrorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignComponent from './Components/SignComponent';
import UpdateUser from './Components/UpdateCitizen';
import MycitizenDashboard from './Components/Dashboard';
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashBoard';
import UpdateCitizen from './Components/UpdateCitizen';
import UpdateEmployee from './Components/UpdateEmployee';

const queryClient = new QueryClient();
function App() {
  const isUserLoggedIn = localStorage.getItem('user') ? true : false
  
return (
  
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      {
        isUserLoggedIn ?
        <>
                <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/EmployeeDashboard" element={<Dashboard />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/signer/:id" element={<SignComponent />} />
                <Route path="/Admin" element={<AdminDashboard />} />
                <Route path="/update/:id" element={<UpdateUser />} />
                <Route path="/CitizenDashboard" element={<Dashboard />} />
                <Route path="/citizen" element={<MycitizenDashboard />} />

                
       </>
       :
        <>        <Route path="/Admin" element={<AdminDashboard />} />
                  <Route path="/updateCitizen/:id" element={<UpdateCitizen />} />
                  <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
                  <Route path="/signer/:id" element={<SignComponent />} />
                 <Route path="/citizen" element={<MycitizenDashboard />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
        </>

      }
               
              
              
            </Routes>
    </BrowserRouter>
  </QueryClientProvider>
  


  )
}

export default App
