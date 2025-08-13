import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login/Login';
import Home from './components/homeAdmin/Home';
import Sigin from './components/signUp/Sign';
import HomePage from './pages/Home/Home';
import GoogleRedirect from './components/login/GoogleRedirect';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Navigate to="/homePage" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/home" element={<Home />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/register" element={<Sigin />} />

      <Route path="/oauth2/redirect" element={<GoogleRedirect />} />
  //   </Routes>
  );
}

export default App;
