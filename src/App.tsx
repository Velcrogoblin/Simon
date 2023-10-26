import { Route, Routes } from "react-router-dom";
import './App.css'
import { Game } from "./Components/Game/Game";
import {Intro } from "./Components/Intro/Intro";

function App() {

  return (
    <>
    <Routes>
        <Route path = "/" element = {<Intro/>} />
        <Route path = "/game" element = {<Game/>} />
    </Routes>
    </>
  )
}

export default App
