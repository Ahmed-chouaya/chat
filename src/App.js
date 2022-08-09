import { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Chat from './component/Chat';
import Login from './component/Login';
import Register from './component/Register';
import { AuthContext } from './context/auth';

function App() {
  const [snackBar, setSnackBar] = useState(false)
  const [snackBarLogin, setSnackBarLogin] = useState(false)
  const { user } = useContext(AuthContext)

  
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={user ? <Navigate to={'/chat'} replace /> : <Login setSnackBarLogin={setSnackBarLogin} />} />
        <Route exact path='/' element={user ? <Navigate to={'/chat'} replace /> : <Register setSnackBar={setSnackBar} />} />
        <Route path='/chat' element={user ? <Chat /> : <Navigate to={'/login'} replace/>} />
      </Routes>
      {snackBar && <div id={snackBar ? "show" : ""} className='snackBar'>
        <img className='okay' src="/verified.png" alt="" />
        <p>you have successfully signed up</p>
      </div>}
      {snackBarLogin && <div id={snackBarLogin ? "show" : ""} className='snackBar'>
        <img className='okay' src="/verified.png" alt="" />
        <p>you have successfully signed in</p>
      </div>}
    </div>
  );
}

export default App;
