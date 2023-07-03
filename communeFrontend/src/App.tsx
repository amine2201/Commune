
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignComponent from './Components/SignComponent';
import Dashboard from './Components/Dashboard';
import UpdateCitizen from './Components/UpdateCitizen';
import UpdateEmployee from './Components/UpdateEmployee';
import AdminDashBoardCitizens from './Components/AdminDashboardCitizens';
import AdminDashboardEmployees from './Components/AdminDashboardEmployees';
import StatsComponent from './Components/StatsComponent';

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
                <Route path="/stats" element={<StatsComponent />} />
                <Route path="/services" element={<Service />} />
                <Route path="/statut" element={<Dashboard />} />
                <Route path="/signer/:id" element={<SignComponent />} />
                <Route path="/updateCitoyen/:id" element={<UpdateCitizen />} />
                <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
                <Route path="/statut" element={<Dashboard />} />
                <Route path="/employe" element={<AdminDashboardEmployees />} />
                <Route path="/citoyen" element={<AdminDashBoardCitizens />} />
                <Route path="/" element={<Homepage />} />
                <Route path="*" element={<Homepage />} />
              
                
       </>
       :
        <>        
                <Route path="/stats" element={<StatsComponent />} />
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
