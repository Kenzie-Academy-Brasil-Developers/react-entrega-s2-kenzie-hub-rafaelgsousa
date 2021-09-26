import { useState } from "react"
import { Stack, TextField, Button } from "@material-ui/core"
import api from "./../../service"
import Card from "../../Component/Card"
import "./style.css"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"

function Dashboard(){

    const {register, handleSubmit} = useForm()

    const [token]= useState(window.localStorage.getItem("KenzieToken") || "")

     //const [user] = useState(window.localStorage.getItem("KenzieUser"))
     const [user] = useState({name:"Rafael",contact:"LinkedIn:Rafael", bio: "Videndo em paz",
     techs:[{title:"JS",status:"iniciante",tech_id:"2a75e12d-fd1c-481d-ba88-4d8b17103b2a"}]})

    //const [techs,setTechs]=useState(window.localStorage.getItem("KenzieUser").techs)
    const [techs,setTechs]=useState(user.techs)
 
    const onSubAdd = (data) => {
        if(!data.title || !data.status) {
            return toast.error("Complete o(s) campo para enviar uma tarefa!")
        }
        //Sinto que função ainda precisa de algum then no final!
        api.post("//users/techs", data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
            })
    }

    return (
        <div className="Container">
            <header>
                <div className="Dados">
                    <h3 className="nome">Nome: {user.name}</h3>
                    <h3 className="contato"> Contato: {user.contact}</h3>
                </div>
                <h3 className="Dados-bio">Bio: {user.bio}</h3>
            </header>
            <form onSubmit={handleSubmit(onSubAdd)}>
                <Stack spacing={1}>
                <TextField id="outlined-basic" 
                    label="Título" variant="outlined" 
                    size="small" {...register("title")}/>

                    <TextField id="outlined-basic"
                    label="Nível" variant="outlined" 
                    size="small" {...register("status")}
                    label="iniciante, intermediário ou avançado"/>

                    <Button variant="outlined" 
                    type="submit">Login</Button>
                </Stack>
            </form>
            <div className="list">
                {techs.map((e,i) => <Card key={i} title={e.title} status={e.status} id={e.tech_id}/>)}
            </div>
        </div>
    )
}

export default Dashboard