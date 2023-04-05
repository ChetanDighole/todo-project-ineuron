import Home from './Components/Home'
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Components/SignUp'
import LogIn from './Components/LogIn'
import NavSignUp from './Components/NavSignUp';


function App() {


  return (
    <>
      <Routes>

        <Route path="/" element={<NavSignUp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/home" element={<Home />} />

      </Routes>

    </>
  );
}

export default App;
