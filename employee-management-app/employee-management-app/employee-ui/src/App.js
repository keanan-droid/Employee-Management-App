import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import {NavBar} from './components/NavBar'
import { AddEmployee } from './components/AddEmployee';
import { UpdateEmployee } from './components/UpdateEmployee';
import { ListEmployees } from './components/ListEmployees';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route index element={<ListEmployees/>} />
      <Route path="/" element={<ListEmployees/>} />
      <Route path="/employeeList" element={<ListEmployees/>} />
      <Route path="/addEmployee" element={<AddEmployee/>} />
      <Route path="/editEmployee/:id" element={<UpdateEmployee/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
