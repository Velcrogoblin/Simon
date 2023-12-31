const VITE_URL_PLAYERS = import.meta.env.VITE_URL_PLAYERS;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HighScore.module.css";

export const HighScore = () => {
const navigate = useNavigate();

const [newHigh, setNewHigh] = useState<Player>({
    id: 0,
    name:"",
    score: 0
});


type Player = {
    id: number | undefined,
    name: string,
    score: number | undefined
  }

    useEffect(() => {
        setNewHigh({...newHigh, score: JSON.parse(sessionStorage.getItem('score') || ""), id: JSON.parse(sessionStorage.getItem('player') || "")});
    }, [])

const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
    setNewHigh({...newHigh, name: e.currentTarget.value})
}

const handleSubmit = async () => {
    try {
        await axios.put(VITE_URL_PLAYERS, newHigh);
        navigate("/");
    } catch(error) {
        alert("Something went wrong");
    }
}

    return(
        <div className = {styles.container}>
            <span className = {styles.text}>LEAVE YOUR MARK</span>
            <div>
            <form>
                <input placeholder="___" className = {styles.text} maxLength={3} onChange = {handleChange}></input>
            </form>
            </div>
            <span className = {styles.text}>{`SCORE: ${newHigh.score}`}</span>
            <span className = {styles.text} onClick = {handleSubmit}>SEND</span>
        </div>
    )
}