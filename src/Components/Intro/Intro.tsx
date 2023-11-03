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
                <Link to = "/game" className = {styles.links}><span>START GAME</span></Link>
                <Link to = "/leaderBoard" className = {styles.links}><span></span><span>LEADERBOARD</span></Link>
            </div>
            <div className = {styles.credits}>
                <span>2023 / VELCROGOBLIN</span>
            </div>
            </div>
        )
}

