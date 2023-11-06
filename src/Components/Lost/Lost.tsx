import { Link } from "react-router-dom";
import styles from "./Lost.module.css";

export const Lost = () => {
        return (
            <div className = {styles.container}>
                <span className = {styles.title}>YOU LOST</span>
            <div className = {styles.menu}>
                <Link to = "/game" className = {styles.links}><span>TRY AGAIN</span></Link>
                <Link to = "/" className = {styles.links}><span>MAIN MENU</span></Link>
            </div>
            </div>
        )
}

