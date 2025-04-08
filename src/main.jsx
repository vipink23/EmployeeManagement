import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import AddEmployee from './Components/AddEmployee.jsx';
import Modal from './Components/Modal.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/AddEmployee" element={<AddEmployee/>}/> 
      <Route path="/AddEmp" element={<Modal/>}/> 

    </Routes>
  </BrowserRouter>
  </StrictMode>,
)
