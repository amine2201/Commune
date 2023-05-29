
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

const queryClient = new QueryClient();

function App() {
return (
  <>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Homepage/>}/>

        <Route path='/Login'  element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>

        <Route path = 'CitizenDashboard' element={<CitizenDashboard/>}/>
        <Route path = 'Service' element={<Service/>}/>
        <Route path = 'Employeedashboard' element={<EmployeeDashboard/>}/>

        <Route path='*' element={<ErrorPage/>}/>
        
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
</>

  )
}

export default App
