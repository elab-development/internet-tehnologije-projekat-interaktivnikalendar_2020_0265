import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Navigacija from './components/Navigacija';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Register from './components/Register';
import Event from './components/Event';
import Profile from './components/Profile';

function App() {
  return (


    <BrowserRouter className="App">
<Navigacija />
<Routes>

  <Route path = "/calendar" element={<Calendar />}/> 
<Route path = "/login" element={<Login/>}/>
<Route path = "/register" element={<Register/>}/>
<Route path = "/profile" element={<Profile/>}/>

</Routes>
      
     
    


    </BrowserRouter>
  );
}

export default App;
