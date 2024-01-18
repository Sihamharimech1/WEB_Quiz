import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import QuizForm from "./QuizForm";
import RegisterProf from "./RegisterProf";
import Test from "./Test";
import "./App.css";
import NavBar from "./nav";
import QuizFil from "./Land";
import BigLogin from "./BigLogin";
import LoginProf from "./loginProf";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Test />} />
        <Route path="/register" element={<Register />} />
        <Route path="/RegisterProf" element={<RegisterProf />} />
        <Route path="/BigLogin" element={<BigLogin />} />
        <Route path="/loginProf" element={<LoginProf />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="tm"  element={<QuizForm filliere="tm"/>}/>
          <Route path="mt"  element={<QuizForm filliere="mt"/>}/>
          <Route path="gi"  element={<QuizForm filliere="gi"/>}/>
          <Route path="idsd"  element={<QuizForm filliere="idsd"/>}/>
          <Route path="ge"  element={<QuizForm filliere="ge" />}/>
          <Route path="err"  element={<QuizForm filliere="err"/>}/>
          <Route path="isil"  element={<QuizForm filliere="isil"/>}/>
          <Route path="mge"  element={<QuizForm filliere="mge"/>}/>
          <Route path="erdd"  element={<QuizForm filliere="erdd"/>}/>
          <Route path="mbf"  element={<QuizForm filliere="mbf"/>}/>
          <Route path="mt-lp" filliere="mt-lp" element={<QuizForm filliere="mt-lp"/>} />
          <Route path="Allquiz"  element={<QuizFil />}/>
        <Route path="/nav" element={<NavBar />} />
      </Routes>
    </Router>  
  );
}

export default App;
