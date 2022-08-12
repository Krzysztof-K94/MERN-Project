import {Landing, Register, Error, ProtectedRoute} from './pages';
import {AddJob, AllJobs, Profile, Stats, SharedLayout} from './pages/dashboard';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout/>
          </ProtectedRoute>}>
          <Route path='/addjob' element={<AddJob/>}></Route>
          <Route path='/alljobs' element={<AllJobs/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route index element={<Stats/>}></Route>
        </Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
