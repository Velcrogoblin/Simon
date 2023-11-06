import { Route, Routes } from "react-router-dom";
import './App.css'
import { Game } from "./Components/Game/Game";
import {Intro } from "./Components/Intro/Intro";
import { LeaderBoard } from "./Components/LeaderBoard/LeaderBoard";
import { HighScore } from "./Components/HighScore/HighScore";
import { Lost } from "./Components/Lost/Lost"

function App() {

  return (
    <>
    <Routes>
        <Route path = "/" element = {<Intro/>} />
        <Route path = "/game" element = {<Game/>} />
        <Route path = "/leaderBoard" element = {<LeaderBoard/>} />
        <Route path = "/highScore" element = {<HighScore/>} />
        <Route path = "/lost" element = {<Lost />} />
    </Routes>
    </>
  )
}

export default App
