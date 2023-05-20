
import './App.css'
import Home from './Components/Home'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Signup from './Components/Signup';
import UploadFile from './Components/UploadFile';
import Status from './Components/Status';
import Service from './Components/Service';
function App() {
return (
  <>
<BrowserRouter>
<Routes>
 <Route path='/' element={<Home/>}/>
 <Route path='Signup' element={<Signup/>}/>
 <Route path='UploadFile' element={<UploadFile/>}/>
 <Route path = '/Status' element={<Status/>}/>
 <Route path = '/Service' element={<Service/>}/>

</Routes>
</BrowserRouter>
</>

  )
}

export default App
