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
        status:yup.string().required("Campo obrigatório!").oneOf(["iniciante", "intermediário","avançado !"],
        "O status deve ser iniciante, intermediário ou avançado")
    })

    const {register,handleSubmit,formState:{errors}}= useForm({resolver:yupResolver(schema)})

    const [token]= useState(window.localStorage.getItem("KenzieToken") || "")

    const [user] = useState(window.localStorage.getItem("KenzieUser"))
    /*const [user] = useState({name:"Rafael",contact:"LinkedIn:Rafael", bio: "Videndo em paz",
     techs:[{title:"JS",status:"iniciante",id:"2a75e12d-fd1c-481d-ba88-4d8b17103b2a"},
            {title:"CSS",status:"iniciante",id:"2a75e12d-fd1c-495d-ba88-4d8b17103b2a"},
            {title:"React",status:"iniciante",id:"2a75e12d-fd1c-481d-ba88-4d8b17103b2a"},
            {title:"Git",status:"iniciante",id:"2a75e12d-fd1c-481d-ba88-4d8b17103t5a"},
            {title:"Python",status:"iniciante",id:"2a75e12d-fd1c-p31d-ba88-4d8b17103t5a"}]})*/

    const [techs,setTechs]=useState(user.techs)

    function loadTechs(){
        api.get("//profile",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        ).then((response)=>setTechs(response.data.techs))
        .catch(err=>console.log(err))
    }
 
    const addTech = (data) => {
        console.log(data)
        if(!data.title || !data.status) {
            return toast.error("Complete o(s) campo para enviar uma tarefa!")
        }
        api.post("//users/techs", data, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((_)=>loadTechs)
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
                {techs.map((e,i) => <Card key={i} title={e.title} status={e.status} id={e.id}/>)}
            </div>
            <div className="logout">
                <Button variant="outlined" onClick={()=>onLogout}>Logout</Button>
            </div>
            
        </div>
    )
}

export default Dashboard