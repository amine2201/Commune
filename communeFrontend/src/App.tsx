
import './App.css'
import Login from './Components/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup';

import Status from './Components/Status';
import Service from './Components/Service';
import Homepage from './Components/Homepage';
function App() {
return (
  <>
<BrowserRouter>
<Routes>
 <Route path='/Homepage' element={<Homepage/>}/>
  <Route path='/' element={<Login/>}/>
 <Route path='Signup' element={<Signup/>}/>
 <Route path = '/Status' element={<Status/>}/>
 <Route path = '/Service' element={<Service/>}/>

</Routes>
</BrowserRouter>
</>

  )
}

export default App
