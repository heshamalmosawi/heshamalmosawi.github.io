import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';

function App() {
  const [logged, setLogged] = useState(false);


  return (
    <div className="App">
      {!logged? <Login auth={setLogged} /> : <h1> Logged In</h1>}
    </div>
  );
}

export default App;
