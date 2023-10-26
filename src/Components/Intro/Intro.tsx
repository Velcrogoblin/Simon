import { Link } from "react-router-dom";
import styles from "./Intro.module.css";
import logo from "../../Media/Images/logo.png";

export const Intro = () => {
        return (
            <div className = {styles.outer}>
            <div className = {styles.title}>
                <img src = {logo}></img>
            </div>
            <div className = {styles.menu}>
                <Link to = "/game" style={{ textDecoration: 'none' }}><span>START GAME</span></Link>
                <span>LEADERBOARD</span>
            </div>
            <div className = {styles.credits}>
                <span>2023 / VELCROGOBLIN</span>
            </div>
            </div>
        )
}

