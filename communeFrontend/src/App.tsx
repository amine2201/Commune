
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

function App() {
return (
  <>
<BrowserRouter>
<Routes>
 <Route path='/' element={<Homepage/>}/>
  <Route path='/Login' element={<Login/>}/>
 <Route path='Signup' element={<Signup/>}/>
 <Route path = '/CitizenDashboard' element={<CitizenDashboard/>}/>
 <Route path = '/Service' element={<Service/>}/>
 <Route path = '/dashboard' element={<EmployeeDashboard/>}/>




</Routes>
</BrowserRouter>
</>

  )
}

export default App
