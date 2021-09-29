import api from "../../service"
import { useState } from "react"
import "./style.css"

function Card({id,title,status,loadTechs}){

    const [token]= useState(JSON.parse(localStorage.getItem("@Kenziehubtoken")) || "")
    console.log(id)
    const Delete = () => {
        api.delete(`/users/techs/${id}`,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then((reponse)=>loadTechs())

    }

    return (
        <div className="Card">
            <h3 className="habilidade">Tec: {title}</h3>
            <p>Nivel: {status}</p>
            <button onClick={Delete}>Deletar</button>
        </div>
    )
}

export default Card