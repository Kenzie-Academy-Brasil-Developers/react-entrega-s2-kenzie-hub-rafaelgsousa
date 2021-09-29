import { useState } from "react"
import { Stack, TextField, Button } from "@material-ui/core"
import api from "./../../service"
import Card from "../../Component/Card"
import "./style.css"
import {useForm} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {toast} from "react-toastify"
import { useHistory } from "react-router"

function Dashboard({setAuthorized}){

    const history = useHistory()

    const schema = yup.object().shape({
        title:yup.string().required("Campo obrigatório!"),
        status:yup.string().required("Campo obrigatório!").oneOf(["iniciante", "intermediário", "avançado"],
        "O status deve ser iniciante, intermediário ou avançado !")
    })

    const {register,handleSubmit,formState:{errors}}= useForm({resolver:yupResolver(schema)})

    const [token]= useState(JSON.parse(localStorage.getItem("@Kenziehubtoken")) || "")

    const [user] = useState(JSON.parse(localStorage.getItem("@KenziehubUser")))

    const [techs,setTechs]=useState(user.techs)
    console.log("techs: ",techs)

    function loadTechs(){
        api.get("/profile",
            {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            }).then((response)=>setTechs(response.data.techs))
        .catch(err=>console.log(err))
    }
 
    const addTech = (data) => {
        console.log(data)
        if(!data.title || !data.status) {
            return toast.error("Complete o(s) campo para enviar uma tarefa!")
        }
        api.post("/users/techs",data ,
        {
        headers: {
            Authorization: `Bearer ${token}`,
            },
        } )
        .then((reponse)=>loadTechs())
        .catch(err=>console.log(err))
    }

    const onLogout = () => {
        localStorage.clear()
        setAuthorized(false)
        return history.push("/login")
    }

    return (
        <div className="Container">
            <header>
                <div className="Dados">
                    <h3 className="nome">Nome: <span>{user.name}</span></h3>
                    <h3 className="contato"> Contato: <span>{user.contact}</span></h3>
                </div>
                <h3 className="Dados-bio">Bio: <span>{user.bio}</span></h3>
            </header>
            <form onSubmit={handleSubmit(addTech)}>
                <h3>Adicionar tecnologia: </h3>
                <Stack spacing={1}>
                <TextField id="outlined-basic" 
                    label="Tecnologia" variant="outlined" 
                    size="small" {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}/>

                    <TextField id="outlined-basic"
                    label="Nível" variant="outlined" 
                    size="small" {...register("status")}
                    error={!!errors.status}
                    helperText={errors.status?.message}/>

                    <Button variant="outlined" 
                    type="submit">Add</Button>
                </Stack>
            </form>
            
            <div className="list">
                {!techs ? null : techs.map((e,i) => <Card key={i} title={e.title} status={e.status} id={e.id}/>)}
            </div>
            <div className="logout">
                <Button variant="outlined" onClick={onLogout}>Logout</Button>
            </div>
            
        </div>
    )
}

export default Dashboard