import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Auth/Auth';
import UploadForm from './components/form/Form';
import ViewUsers from './components/admin/viewForm';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element= {<Login/>} />      
      <Route path='/form' element= {<UploadForm/>} />      
      <Route path='/admin/view' element= {<ViewUsers/>} />      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
