import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import Navigacija from './components/Navigacija';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Register from './components/Register';
import Event from './components/Event';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import React, { useState } from 'react';


function App() {

 
  const [events, setEvents] = useState();
  const [categories, setCategories] = useState();
  const [token, setToken] = useState();
  const [currentUser, setCurrentUser] = useState({username: 'Username',
  email: 'username@gmail.com'});

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  function addToken(auth_token){
    setToken(auth_token);
  }
  
  const updateCurrentUser = (user_id) => {
    setCurrentUser(user_id);
  };

  return (

    <BrowserRouter className="App">
<Navigacija />
<Routes>

          <Route path="/calendar"  element={<Calendar  events={events} updateEvents={updateEvents} categories={categories} updateCategories={updateCategories}/>} />
          <Route path="/login" element={<Login addToken={addToken} updateCurrentUser = {updateCurrentUser}/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile events={events} setEvents={setEvents} currentUser={currentUser} />}/>
          <Route path="/" element={<Navigate to="/login" />} />
 </Routes>
    </BrowserRouter>
  
  );
}

export default App;
