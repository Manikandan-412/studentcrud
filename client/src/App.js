import {BrowserRouter,Routes,Route} from 'react-router-dom';
import RegistrationForm from './components/Student/Registeration';
import ProfilePage from './components/Student/Profile';
import LoginPage from './components/Student/Login';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element= {<RegistrationForm/>} />          
      <Route path='/login' element= {<LoginPage/>} />          
      <Route path='/' element= {<ProfilePage/>} />          
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
