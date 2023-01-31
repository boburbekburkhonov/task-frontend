import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Interface from './Components/Interface/Interface';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

const App = () => {
  return (
    <div>
      <Routes>

        <Route path='/' element= {<Signup/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/user/interface' element= {<Interface/>} />

      </Routes>
    </div>
  );
};

export default App;