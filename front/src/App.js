import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Navigacija from './components/Navigacija';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function App() {
  return (


    <BrowserRouter className="App">
<Navigacija />
<Routes>

  <Route path = "/calendar" element={<Calendar />}/> 
<Route path = "/login" element={<Login/>}/>


</Routes>
      
     
    


    </BrowserRouter>
  );
}

export default App;
