import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const VITE_URL_PLAYERS = import.meta.env.VITE_URL_PLAYERS;

import styles from "./LeaderBoard.module.css";

export const LeaderBoard = () => {

    type Players = {
        id: number,
        name: string,
        score: number
      }

    const [leaderBoard, setLeaderBoard] = useState<Players[]>();

    useEffect (() => {
        axios.get(VITE_URL_PLAYERS)
        .then ((res) => {
          console.log(res.data);
          setLeaderBoard(res.data.sort((r1: Players, r2: Players) => (r1.score < r2.score) ? 1 : (r1.score > r2.score) ? -1 : 0))
        })
      },[])

    return (
        <div className = {styles.container}>
            <span className = {styles.title}>MASTER CHAMPIONS OF THE UNIVERSE</span>
            <div className = {styles.score}>
            {leaderBoard?.map((p) => {
                return (
                        <span key = {p.id}>{`${p.name.toUpperCase()}.......${p.score}`}</span>
                )
            })}
            </div>
            <Link to = "/" className = {styles.links}><span>BACK</span></Link>
        </div>
    )
}