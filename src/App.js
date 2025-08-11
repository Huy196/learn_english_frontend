import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Home from './components/homeAdmin/Home';
import Sigin from './components/sigin/Sigin';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Login/>} /> 
      <Route path="/admin/home" element={<Home />} />
     <Route path="/admin/register" element={<Sigin />} />

  {/* //      <Route path="/oauth2/redirect" element={<GoogleRedirect />} /> */}
  {/* //      <Route path="/add-user" element={<AddUser />} /> */}
  //   </Routes>
  );
}

export default App;
