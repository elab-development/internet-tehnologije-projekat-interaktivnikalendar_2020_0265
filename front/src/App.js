import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Navigacija from './components/Navigacija';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './components/Register';
import Event from './components/Event';
import Profile from './components/Profile';
import React, { useState } from 'react';


function App() {

 
  const [events, setEvents] = useState({});
  const [token, setToken] = useState();

  const updateEvents = (newEvents) => {
    setEvents(newEvents);

  };

  function addToken(auth_token){
    setToken(auth_token);
  }

  return (

    <BrowserRouter className="App">
<Navigacija />
<Routes>

          <Route path="/calendar"  element={<Calendar  events={events} updateEvents={updateEvents} />} />
          <Route path="/login" element={<Login addToken={addToken}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile events={events} setEvents={setEvents} />}/>
          <Route path="/" element={<Navigate to="/login" />} />
 </Routes>
    </BrowserRouter>
  
  );
}

export default App;
