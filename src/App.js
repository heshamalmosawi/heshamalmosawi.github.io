import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  const [logged, setLogged] = useState(false);


  return (
    <div className="App">
      {/* {!logged? <Login auth={setLogged} /> : <Dashboard/>} */}
      <Dashboard/>
    </div>
  );
}

export default App;
