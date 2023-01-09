import { Route, Routes } from 'react-router-dom';
import ContactPage from './pages/public/ContactPage';
import Homepage from './pages/public/HomePage';
import UserProfilPage from './pages/private/UserProfilPage';
import DashboardPage from './pages/private/DashboardPage';
import Department from './components/entity/department/Departement';
import AddDepartment from './components/entity/department/AddDepartment';
import ListesDepartments from './components/entity/department/ListDepartments'; 
import Job from './components/entity/job/Job';
import AddJob from './components/entity/job/AddJob';              
import ListJobs from './components/entity/job/ListJobs';    
import JobCategory from './components/entity/jobcategory/JobCategory';
import ListesJobCategories from './components/entity/jobcategory/ListJobCategories';  
import JobOffer from './components/entity/joboffer/JobOffer';
import LoginPage from './pages/public/LoginPage';
import AddJobCategory from './components/entity/jobcategory/AddJobCategory';
import axios from 'axios';
import Holiday from './components/entity/Holiday/Holiday';
import ListHolidays from './components/entity/Holiday/ListHolidays';
import AddHoliday from './components/entity/Holiday/AddHoliday';
import EditDepartment from './components/entity/department/EditDepartment';
import EditHoliday from './components/entity/Holiday/EditHoliday';
import EditJobCategory from './components/entity/jobcategory/EditJobCategory';
import EditJob from './components/entity/job/EditJob';
import User from './components/entity/user/User';
import ListUsers from './components/entity/user/ListUsers';
import AddUser from './components/entity/user/AddUser';
import EditUser from './components/entity/user/EditUser';
import ListJobOffers from './components/entity/joboffer/ListJobOffers';
import AddJobOffer from './components/entity/joboffer/AddJobOffer';
import JobByJobCategory from './components/entity/job/JobByJobCategory';
import JobByDepartment from './components/entity/job/JobByDepartment';
import ListCandidateByJobOffer from './components/entity/candidate/ListCandidateByJobOffer';
import AddCandidate from './components/entity/candidate/AddCandidate';
import AddCandidateDegree from './components/entity/candidate/AddCandidateDegree';
import CandidateByJobOffer from './components/entity/candidate/CandidateByJobOffer';
import AddCandidateExperience from './components/entity/candidate/AddCandidateExperience';
import Interview from './components/entity/interview/Interview';
import AboutPerson from './components/entity/candidate/AboutPerson';
import AddJobOfferQuestion from './components/entity/joboffer/AddJobOfferQuestion';
import ListQuestions from './components/entity/joboffer/ListQuestions';
import Questions from './components/entity/joboffer/Questions';
import AddCandidateResponses from './components/entity/interview/AddCandidateResponses';
import ChoosedCandidate from './components/entity/candidate/choosedcandidate/ChoosedCandidate';
import CandidateResults from './components/entity/candidate/candidateresult/CandidateResults';
import Employee from './components/entity/Employee/Employee';
import ListEmployees from './components/entity/Employee/ListEmployees';
import AddEmployee from './components/entity/Employee/AddEmployee';
import AboutEmployee from './components/entity/Employee/AboutEmployee';
import Vacation from './components/entity/vacation/Vacation';
import VacationStories from './components/entity/vacation/VacationStories';
import Interviews from './components/entity/interview/Interviews';
import JobOfferManager from './components/entity/joboffer/JobOfferManager';
import ListeCandidatesResults from './components/entity/candidate/candidateresult/ListeCandidatesResults';
import ListChoosedCandidates from './components/entity/candidate/choosedcandidate/ListChoosedCandidates';

export default function App() {
  if(localStorage.getItem('accessToken'))
      axios.defaults.headers.common["Authorization"]="Bearer " + localStorage.getItem('accessToken');
  
  return (
    <Routes>
        <Route path="/" element={ <Homepage/> }></Route>
            <Route path="/dashboard" element = { <DashboardPage/> }>
                <Route path="departments" element = { <Department/> }>
                    <Route index='departments' element = {<ListesDepartments/>}></Route>
                    <Route path = "add" element = { <AddDepartment/> }></Route>
                    <Route path = ":iddepartment/edit" element = { <EditDepartment/> }></Route>
                    <Route path=":iddepartment/jobs" element={<JobByDepartment/>}></Route>  
                </Route>  
                <Route path="jobs" element={<Job/>}>
                    <Route index="jobs" element={<ListJobs/>}></Route>
                    <Route path="add" element={<AddJob/>}></Route>
                    <Route path=":idjob/edit" element={<EditJob/>}></Route>
                    <Route path=":idjob/addjoboffer" element={<AddJobOffer/>}></Route>
                </Route>
                <Route path="jobcategories" element={<JobCategory/>}>
                    <Route index="jobcategories" element={<ListesJobCategories/>}></Route>
                    <Route path="add" element={<AddJobCategory/>}></Route>
                    <Route path=":idjobcategory/edit" element={<EditJobCategory/>}></Route>
                    <Route path=":idjobcategory/jobs" element={<JobByJobCategory/>}></Route>
                </Route>
                <Route path="holidays" element={<Holiday/>}>
                    <Route index="holidays" element={<ListHolidays/>}></Route>
                    <Route path="add" element={<AddHoliday/>}></Route>
                    <Route path=":idholiday/edit" element={<EditHoliday/>}></Route>
                </Route>
                <Route path="users" element={<User/>}>
                    <Route index="users" element={<ListUsers/>}></Route>
                    <Route path="add" element={<AddUser/>}></Route>
                    <Route path=":iduser/edit" element={<EditUser/>}></Route>
                </Route>
                <Route path="employees" element={<Employee/>}>
                    <Route index="employees" element={<ListEmployees/>}></Route>
                    <Route path=":idperson/addemployee" element={<AddEmployee/>}></Route>
                    <Route path=":idemployee/about" element={<AboutEmployee/>}></Route>
                    <Route path=":idemployee/vacation" element={<Vacation/>}>
                        <Route index=":idemployee/vacation" element={<VacationStories/>}></Route>
                    </Route>
                </Route>
                <Route path="joboffers" element={<JobOffer/>}>
                    <Route index="joboffers" element={<ListJobOffers/>}></Route>
                    <Route path="add" element={<AddJobOffer/>}></Route>
                    <Route path=":idjoboffer/managers" element={<JobOfferManager/>}>
                        <Route path="candidates" element={<CandidateByJobOffer/>}>
                            <Route index="candidates" element={<ListCandidateByJobOffer/>}></Route>
                            <Route path='add' element={<AddCandidate/>}></Route>
                            <Route path=":idcandidate/adddegree" element={<AddCandidateDegree/>}></Route>
                            <Route path=":idcandidate/addexperience" element={<AddCandidateExperience/>}></Route>
                            <Route path=":idcandidate/about" element={<AboutPerson/>}></Route>
                            <Route path=":idcandidate/addresponse" element={<AddCandidateResponses/>}></Route>
                        </Route>
                        <Route path="choosedcandidates" element={<ChoosedCandidate/>}>
                                <Route index="choosedcandidates" element={<ListChoosedCandidates/>}></Route>
                                <Route path=":idcandidate/about" element={<AboutPerson/>}></Route>
                                <Route path=":idperson/addemployee" element={<AddEmployee/>}></Route>
                        </Route>  
                        <Route path="candidateresults" element={<CandidateResults/>}>
                            <Route index="candidateresults" element={<ListeCandidatesResults/>}></Route>
                            <Route path=":idcandidate/about" element={<AboutPerson/>}></Route>
                        </Route>
                        <Route path="interviews" element={<Interview/>}>
                            <Route index='interviews' element={<Interviews/>}></Route>
                            <Route path=":idcandidate/addresponse" element={<AddCandidateResponses/>}></Route>
                            <Route path=":idcandidate/about" element={<AboutPerson/>}></Route>
                        </Route>
                        <Route path="questions" element={<Questions/>}>
                            <Route index="questions" element={<ListQuestions/>}></Route>
                            <Route path="add" element={<AddJobOfferQuestion/>}></Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
        <Route path="/contact" element={ <ContactPage/> }></Route>
        <Route path = "/userprofil" element={ <UserProfilPage/> }></Route>
        <Route path = "/login" element={ <LoginPage/> }></Route>
    </Routes>
);
}

