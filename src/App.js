import './App.css';
import $ from 'jquery'
import { Route, Routes } from 'react-router-dom';
import ContactPage from './pages/public/ContactPage';
import Homepage from './pages/public/HomePage';
import UserProfilPage from './pages/private/UserProfilPage';
import DashboardPage from './pages/private/DashboardPage';
import Department from './components/entity/Department/Departement';
import AddDepartment from './components/entity/Department/AddDepartment';
import Job from './components/entity/Job/Job';
import JobCategory from './components/entity/job_category/JobCategory';
import JobOffer from './components/entity/job_offer/JobOffer';
import LoginPage from './pages/public/LoginPage';
import ListesDepartments from './components/entity/Department/ListesDepartments';
import ListeDepTest from './components/entity/Department/ListeDepTest';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Homepage/> }></Route>
      <Route path="/dashboard_page" element = { <DashboardPage/> }>
        <Route path="department" element = { <Department/> }>
          <Route index='department' element = {<ListesDepartments/>}></Route>
          <Route path = "add_department" element = { <AddDepartment/> }></Route>
          <Route path = "table" element = { <ListeDepTest/> }></Route>
        </Route>
        <Route path="job" element={<Job/>}></Route>
        <Route path="job_category" element={<JobCategory/>}></Route>
        <Route path="job_offer" element={<JobOffer/>}></Route>
        
      </Route>
      <Route path="/contact" element={ <ContactPage/> }></Route>
      <Route path = "/user_profil" element={ <UserProfilPage/> }></Route>
      <Route path = "login" element={ <LoginPage/> }></Route>
    </Routes>
);
}

