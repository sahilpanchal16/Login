// import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import { Routes, Route } from 'react-router-dom';
import Ragistartion from './component/Ragistartion';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Ragistartion />} />
      </ Routes>

    </div>
  );
}

export default App;
