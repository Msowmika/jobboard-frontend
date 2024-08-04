import {Routes,Route} from 'react-router-dom';
import {Home} from './pages/home'
import {Register} from './pages/register'
import {Login} from './pages/login'
import {Create} from './pages/create'
import {Job} from './pages/job'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
  <>
  <Toaster /> 
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/new' element={<Create/>}></Route>
    <Route path='/job/:id' element={<Job/>}></Route>
    <Route path='/edit/:id' element={<Create/>}></Route>
  </Routes>
  </>
  )
}

export default App
